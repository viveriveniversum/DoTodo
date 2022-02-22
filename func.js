const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoLists = document.querySelectorAll(".todo-list");
const todos = document.querySelectorAll(".todo");
const todoPlannedList = document.querySelector(".planned");
const todoInprogressList = document.querySelector(".inprogress");
const todoDoneList = document.querySelector(".done");
const WEATHER_API_KEY = "89bda37a8104a7cbacd224a8166ce0a0";
const GIPHY_API_KEY = "A97cbDPe9Rfd42MJLKtbXxj8jb1uWIT8";
const searchButton = document.querySelector(".search button");
const searchBar = document.querySelector(".search-bar");

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
