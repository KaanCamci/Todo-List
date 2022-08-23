const addText = document.querySelector("#add-text");
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector(".list-group");
const todosPart = document.querySelector("#todos-part");
const deleteAllButton = document.querySelector("#delete-all");
const searchBar = document.querySelectorAll(".form-control")[1];

eventListeners();

function eventListeners(){
    todoForm.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodos);
    todosPart.addEventListener("click", deleteItem);
    deleteAllButton.addEventListener("click", deleteAllItems);
    searchBar.addEventListener("keyup", search);
}

function addTodo(e){
    if(addText.value != ""){
    const newTodo = addText.value;

    addNewTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    }
    e.preventDefault();
}

function addNewTodoToUI(newTodo){

    //li ve a elementlerini oluşturup ul'ye eklemek

    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href ="#";
    link.className="delete-item";
    link.innerHTML="<i class= 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    if(!todoList.hasChildNodes){
    todoList.appendChild(listItem);
    }
    else{
        todoList.insertBefore(listItem,todoList.firstChild);
    }
    addText.value="";
}

function getTodosFromStorage(){

    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();
    todos.unshift(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}

 function loadAllTodos(){
    let todos = getTodosFromStorage();

    

    for(let i = todos.length-1;i>=0;i--){
        addNewTodoToUI(todos[i]);
    }
    
 }

 function deleteItem(e){
    if(e.target.className == "fa fa-remove"){
        
        let todos = getTodosFromStorage();

        let elementIndex = 0;
        let deleteFlag = 0;
        todos.forEach(element => {
            if(element === e.target.parentElement.parentElement.textContent && deleteFlag === 0){
                todos.splice(elementIndex,1);
                localStorage.setItem("todos",JSON.stringify(todos));
                deleteFlag++;
            }
            elementIndex++;
        });
        e.target.parentElement.parentElement.remove();
    }
 }

function deleteAllItems(){
    todoList.innerHTML='';
    let todos = getTodosFromStorage();
    
    while(todos.length>0){
        todos.pop();
    }

    localStorage.setItem("todos",JSON.stringify(todos));

}

function search(e){
    const searchValue = e.target.value.toLowerCase();
    const todosValues = document.querySelectorAll(".list-group-item");

    todosValues.forEach(function(todoValue){
        const text = todoValue.textContent.toLowerCase();

        if(text.indexOf(searchValue)<0){
            todoValue.setAttribute("style", "display: none !important");
        }

    });

    if(searchValue ===""){

        todosValues.forEach(function(todoValue){
                todoValue.setAttribute("style", "display: block");
        });

    }

}












