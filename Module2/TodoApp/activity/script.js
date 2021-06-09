let addTodoButton = document.querySelector(".add-todo");
let todoInput = document.querySelector(".todo-input");
let containerlist=document.querySelector(".todos-list-container");


todoInput.addEventListener("keypress" , function(e){
    if(e.key == "Enter"){
        addTodo();
    }
});
addTodoButton.addEventListener( "click" , function(){
    addTodo();
});

// attach click event on addTodoButton
function addTodo(){
    let todoInputValue = todoInput.value;
    if(todoInputValue){
            appendTodo(todoInputValue);
            // it will empty the todoInput
            todoInput.value = "";
        }
}
    
function appendTodo(todoInputValue){
    let todoItemDiv=document.createElement("div");
    todoItemDiv.classList.add("todo-item");

    let todoInput=document.createElement("p");
    todoInput.classList.add("todo");
    todoInput.textContent=todoInputValue;

    let deletetodo=document.createElement("button");
    deletetodo.classList.add("delete-todo");
    deletetodo.textContent="Delete";

    deletetodo.addEventListener("click",function(e){
       e.target.parentNode.remove(); 
    });

    todoItemDiv.append(todoInput);
    todoItemDiv.append(deletetodo);

    containerlist.append(todoItemDiv);

}