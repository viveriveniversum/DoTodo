import { saveLocalStorage } from "../handler/localStorageHandler.mjs";

const todoInput = document.querySelector(".todo-input");
const todoPlannedList = document.querySelector(".planned");
//Add todo to list
export const addTodo = (event) => {
  //Prevent form from submitting(default)
  event.preventDefault();
  //If not value
  if ($.trim($(".todo-input").val()) == "") {
    //This $ condition is searched and found via stackoverflow.
    alert("Input is blank");
    todoInput.value = "";
  } else {
    //todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.draggable = "true";

    //List element
    const newTodo = document.createElement("p");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    newTodo.contentEditable = "true";
    todoDiv.appendChild(newTodo);
    saveLocalStorage(todoInput.value);
    //Highlight Button
    const highlightButton = document.createElement("button");
    highlightButton.innerHTML = "<i class='fa-solid fa-highlighter'></i>";
    highlightButton.classList.add("highlight-btn");
    todoDiv.appendChild(highlightButton);
    //Checkmark Button
    const checkmarkButton = document.createElement("button");
    checkmarkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkmarkButton.classList.add("checkmark-btn");
    todoDiv.appendChild(checkmarkButton);
    //Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'> </i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append todoDiv
    todoPlannedList.appendChild(todoDiv);
    //Clear todoInput value
    todoInput.value = "";
  }
};
