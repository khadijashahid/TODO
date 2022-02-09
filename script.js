if (window.localStorage) { // checks if browser support localStorage
    if (localStorage['testKey']) { // checks if value exists
        console.log('Value exist on page load in localstorage for key testKey : ', localStorage['testKey']);
    }
    localStorage['testKey'] = 'Hi again!'; // stores value in localstorage
} else {
    console.log('your browser dont support localstorage');
}


const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

let todo = [];
document.getElementById("btn").hidden = true;
addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    let todoArray = localStorage.getItem("todoArray");
    if (todoArray === null) {
        todo = [];

    } else {

        todo = JSON.parse(todoArray);
    }

    todo.push(text.value);
    text.value = "";
    localStorage.setItem("todoArray", JSON.stringify(todo));
    displayTodo();

});


function displayTodo() {
    let todoArray = localStorage.getItem("todoArray");
    if (todoArray === null) {
        todo = [];
    } else {

        todo = JSON.parse(todoArray);
    }

    let htmlCode = "";
    todo.forEach((list, ind) => {
        htmlCode += `<div id="task">
        <div id="listTask"> 
         <p id="taskname">${list}</p>
         </div>

   <button class="btn-red" onclick='edit(${ind})'><i class="fas fa-edit"></i></button>
   <button class="btn-blue" onclick='deleteTodo(${ind})' ><i class="fas fa-trash" > </i></button>
  
</div>`;
    });
    document.getElementById("btn").hidden = false;
    listBox.innerHTML = htmlCode;
}

function deleteTodo(ind) {
    let todoArray = localStorage.getItem("todoArray");
    todo = JSON.parse(todoArray);
    todo.splice(ind, 1);
    localStorage.setItem("todoArray", JSON.stringify(todo));
    displayTodo();
}

function edit(ind) {
    saveInd.value = ind;
    let todoArray = localStorage.getItem("todoArray");
    todo = JSON.parse(todoArray);
    text.value = todo[ind];
    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";

}


saveTaskButton.addEventListener("click", () => {
    let todoArray = localStorage.getItem("todoArray");
    todo = JSON.parse(todoArray);
    let id = saveInd.value;
    todo[id] = text.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    text.value = "";
    localStorage.setItem("todoArray", JSON.stringify(todo));
    displayTodo();
});

// to clear the local storage
document.querySelector('#btn').onclick = function() {
    localStorage.clear();
    displayTodo();
}