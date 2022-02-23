//Selectors
const todoPlannedList = document.querySelector(".planned");
const todoInprogressList = document.querySelector(".inprogress");
const todoDoneList = document.querySelector(".done");

//Define a check function for local storage not to repeat over and over
export function checkLocal(list) {
  let todos;
  if (localStorage.getItem(list) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(list));
  }
  return todos;
}

//Save todos to local storage for different lists
export function saveLocalStorage(todo) {
  //Check local storage
  let todos = checkLocal("todos");
  //Add todo to local storage
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function saveLocalStorageProgress(todo) {
  //Check local storage
  let todos = checkLocal("progress");
  //Add todo to local storage
  todos.push(todo);
  localStorage.setItem("progress", JSON.stringify(todos));
}

export function saveLocalStorageDone(todo) {
  //Check local storage
  let todos = checkLocal("done");
  //Add todo to local storage
  todos.push(todo);
  localStorage.setItem("done", JSON.stringify(todos));
}

//Get todos to planned, in-progress and done lists
export function getLocalTodos() {
  //Check local storage
  let todos = checkLocal("todos");
  //Populate todos on the page
  todos.forEach((todo) => {
    //todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.draggable = "true";

    //List element
    const newTodo = document.createElement("p");
    newTodo.innerText = todo;
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
  });
}

export function getLocalProgressTodos() {
  //Check local storage
  let todos = checkLocal("progress");
  //Populate todos on the page
  todos.forEach((todo) => {
    //todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.draggable = "true";

    //List element
    const newTodo = document.createElement("p");
    newTodo.innerText = todo;
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
    todoInprogressList.appendChild(todoDiv);
  });
}

export function getLocalDoneTodos() {
  //Check local storage
  let todos = checkLocal("done");
  //Populate todos on the page
  todos.forEach((todo) => {
    //todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.draggable = "true";

    //List element
    const newTodo = document.createElement("p");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    newTodo.contentEditable = "true";
    todoDiv.appendChild(newTodo);

    //Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'> </i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append todoDiv
    todoDoneList.appendChild(todoDiv);
  });
}

//Remove todos from different local lists
export function removeLocalTodos(todo) {
  //Check local storage
  let todos = checkLocal("todos");
  //Delete item from local storage
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function removeLocalProgressTodos(todo) {
  //Check local storage
  let todos = checkLocal("progress");
  //Delete item from local storage
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem("progress", JSON.stringify(todos));
}

export function removeLocalDoneTodos(todo) {
  //Check local storage
  let todos = checkLocal("done");
  //Delete item from local storage
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem("done", JSON.stringify(todos));
}
