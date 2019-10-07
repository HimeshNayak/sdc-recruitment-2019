function clearStorage()
{
	localStorage.clear();
	location.reload();
}

var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("date").innerHTML = "Today's Date : " + d.getDate() + ", " + months[Number(d.getMonth())] + " " + d.getFullYear() + "<br> Time : " + d.getHours() + " : " + d.getMinutes();

//To Do Array 
function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}

function get_dones() {
    var dones = new Array;
    var dones_str = localStorage.getItem('taskDone');
    if (dones_str !== null) {
        dones = JSON.parse(dones_str); 
    }
    return dones;
}

function add() {
	var time = Number(document.getElementById('timeLimit').value);
    var task = document.getElementById('task').value;
	if (task == "" || isNaN(time))
	{
		alert("Enter a Task with Valid Time");
	}
	else{
		task +=  " : To Be Done by next " + time + " hours<br>";
		task += "Task On : " + d.getDate() + ", " + months[Number(d.getMonth())] + " " + d.getFullYear() + "<br> Time : " + d.getHours() + " : " + d.getMinutes();
		var todos = get_todos();
		todos.push(task);
		localStorage.setItem('todo', JSON.stringify(todos));
	 
		show();
	 
		return false;
	}
}
 
function trash() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}

function done() {
    var id = this.getAttribute('id');
    var todos = get_todos();
	var dones = get_dones();
	dones.push(todos[id]);
	localStorage.setItem('taskDone', JSON.stringify(dones));
    todos.splice(id, 1);
	localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}

function trashDone() {
    var id = this.getAttribute('id');
    var dones = get_dones();
    dones.splice(id, 1);
    localStorage.setItem('taskDone', JSON.stringify(dones));
 
    show();
 
    return false;
} 
 
function show() {
    var todos = get_todos();
	var dones = get_dones();
	
    var html = '<ul>';
    for(var i=0; i < todos.length; i++) {
        html += '<li>' + todos[i] +'<br><br><button class="trash" id="' + i + '">Trash</button> <button class="done" id="' + i + '">Done</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('items').innerHTML = html;
 
	var dhtml = '<ul>';
    for(var i=0; i < dones.length; i++) {
        dhtml += '<li>' + dones[i] +'<br><br><button class="trashDone" id="' + i + '">Trash</button>';
    };
    dhtml += '</ul>';
 
    document.getElementById('taskDone').innerHTML = dhtml;
 
    var trashB = document.getElementsByClassName('trash');
    for (var i=0; i < trashB.length; i++) {
        trashB[i].addEventListener('click', trash);
    };
	
	var doneB = document.getElementsByClassName('done');
    for (var i=0; i < doneB.length; i++) {
        doneB[i].addEventListener('click', done);
    };
	
	var trashDoneB = document.getElementsByClassName('trashDone');
    for (var i=0; i < trashDoneB.length; i++) {
        trashDoneB[i].addEventListener('click', trashDone);
    };
}
 
document.getElementById('add').addEventListener('click', add);
show();