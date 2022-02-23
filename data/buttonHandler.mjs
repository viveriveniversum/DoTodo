import {
  removeLocalTodos,
  saveLocalStorageProgress,
  removeLocalProgressTodos,
  saveLocalStorageDone,
  removeLocalDoneTodos,
} from "../handler/localStorageHandler.mjs";
import { populateGif } from "./gifData.mjs";
import { addTodo } from "../view/todoView.mjs";

//Selectors
const todoButton = document.querySelector(".todo-button");
const todoPlannedList = document.querySelector(".planned");
const todoInprogressList = document.querySelector(".inprogress");
const todoDoneList = document.querySelector(".done");

// For three different kanban list, buttons will run three different functions.
// These will delete, highlight todos and change the list.
export const firstCheck = (e) => {
  const item = e.target;
  //Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
      populateGif("bye");
    });
  }
  //Highlight
  if (item.classList[0] === "highlight-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("highlighted");
  }
  // Switch to in-progress
  if (item.classList[0] === "checkmark-btn") {
    const todo = item.parentElement;
    const oldParent = todo.parentNode;
    const index = Array.prototype.indexOf.call(oldParent.children, todo);
    const newParent = oldParent.nextElementSibling;
    removeLocalTodos(todo);
    if (oldParent.childNodes.length > 0) {
      newParent.appendChild(oldParent.children[index]);
      saveLocalStorageProgress(todo.innerText);
    }
    populateGif("action");
  }
};

export const secondCheck = (e) => {
  const item = e.target;
  //Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalProgressTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
      populateGif("bye");
    });
  }
  //Highlight
  if (item.classList[0] === "highlight-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("highlighted");
  }
  //Switch to done list
  if (item.classList[0] === "checkmark-btn") {
    const todo = item.parentElement;
    const oldParent = todo.parentNode;
    const index = Array.prototype.indexOf.call(oldParent.children, todo);
    const newParent = oldParent.nextElementSibling;
    removeLocalProgressTodos(todo);
    if (oldParent.childNodes.length > 0) {
      const prev = item.previousElementSibling;
      const text = item.previousElementSibling.previousElementSibling;
      text.style.textDecoration = "line-through";
      item.style.display = "none";
      prev.style.display = "none";
      newParent.appendChild(oldParent.children[index]);
    }
    saveLocalStorageDone(todo.innerText);
    populateGif("congrats");
  }
};

export const thirdCheck = (e) => {
  const item = e.target;
  //Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalDoneTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
      populateGif("bye");
    });
  }
};

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoButton.addEventListener("click", () => {
  populateGif();
});
todoPlannedList.addEventListener("click", firstCheck);
todoInprogressList.addEventListener("click", secondCheck);
todoDoneList.addEventListener("click", thirdCheck);
