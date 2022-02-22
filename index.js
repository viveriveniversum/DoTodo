//SELECTORS
const musicContainer = document.querySelector(".music-container");
const playButton = document.querySelector("#play");
const audio = document.querySelector(".audio");
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoLists = document.querySelectorAll(".todo-list");
const preloader = document.querySelector(".preloader");
const todoPlannedList = document.querySelector(".planned");
const todoInprogressList = document.querySelector(".inprogress");
const todoDoneList = document.querySelector(".done");
const WEATHER_API_KEY = "89bda37a8104a7cbacd224a8166ce0a0";
const GIPHY_API_KEY = "A97cbDPe9Rfd42MJLKtbXxj8jb1uWIT8";
const searchButton = document.querySelector(".search button");
const searchBar = document.querySelector(".search-bar");
//FUNCTIONS --
//Drag and Drop
//D&D is new concept to me in JS. I searched it via youtube and designed it with the help of Tyler Potts

//Get the weather data
async function fetchUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return response.json();
}

// Populate Gif
async function populateGif(mood = "go") {
  const data = await fetchUrl(
    `https://api.giphy.com/v1/gifs/search?q=${mood}&rating=g&api_key=${GIPHY_API_KEY}`
  );

  const random = Math.floor(Math.random() * 19) + 1;
  const { url } = data.data[random].images.downsized;
  const imgDiv = document.querySelector(".img");
  const img = document.createElement("img");
  img.style.display = "block";
  img.src = url;
  img.style.maxWidth = "200px";
  img.style.maxHeight = "200px";
  setTimeout(() => {
    img.style.display = "none";
  }, 2000);
  imgDiv.appendChild(img);
}

//Populate the weather data on the page
async function populateWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
  const data = await fetchUrl(url);
  const { name } = data;
  const { description, icon } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector(".city").textContent = name;
  document.querySelector(".temp").textContent = `${temp} °C`;
  document.querySelector(
    ".icon"
  ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.querySelector(".description").textContent = description;
  document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
  document.querySelector(".wind").textContent = `Wind: ${speed} km/h`;
  document.body.style.backgroundImage = `url(
    https://source.unsplash.com/1600x900/?${city}
  )`;
}

//Search for the city value
async function searchWeather() {
  const city = document.querySelector(".search-bar").value;
  await populateWeather(city);
}

//Add todo to list
const addTodo = (event) => {
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

const firstCheck = (e) => {
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

const secondCheck = (e) => {
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
      newParent.appendChild(oldParent.children[index]);
      saveLocalStorageDone(todo.innerText);
    }
    populateGif("congrats");
    const prev = item.previousElementSibling;
    const text = item.previousElementSibling.previousElementSibling;
    text.style.textDecoration = "line-through";
    item.style.display = "none";
    prev.style.display = "none";
  }
};

const thirdCheck = (e) => {
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

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getLocalTodos);
document.addEventListener("DOMContentLoaded", getLocalProgressTodos);
document.addEventListener("DOMContentLoaded", getLocalDoneTodos);
todoButton.addEventListener("click", addTodo);
todoButton.addEventListener("click", () => {
  populateGif("letsgo");
});
todoPlannedList.addEventListener("click", firstCheck);
todoInprogressList.addEventListener("click", secondCheck);
todoDoneList.addEventListener("click", thirdCheck);

searchButton.addEventListener("click", searchWeather);
searchBar.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchWeather();
  }
});
window.addEventListener("load", () => {
  populateWeather((city = "amsterdam"));
  loadSong((city = "amsterdam"));
  setTimeout(() => {
    preloader.style.display = "none";
  }, 3000);
});

async function loadSong(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
  const data = await fetchUrl(url);
  const { description } = data.weather[0];
  audio.src = `./public/assets/sounds/${description}.mp3`;
  audio.load();
}

function playMusic() {
  musicContainer.classList.add("play");
  playButton.querySelector("i.fa-solid").classList.remove("fa-play");
  playButton.querySelector("i.fa-solid").classList.add("fa-pause");
  audio.play();
}

function pauseMusic() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fa-solid").classList.add("fa-play");
  playButton.querySelector("i.fa-solid").classList.remove("fa-pause");
  audio.pause();
}
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});
//Define a check function for local storage not to repeat over and over
function checkLocal(list) {
  let todos;
  if (localStorage.getItem(list) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(list));
  }
  return todos;
}

//Save todos to local storage for different lists
function saveLocalStorage(todo) {
  //Check local storage
  let todos = checkLocal("todos");
  //Add todo to local storage
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalStorageProgress(todo) {
  //Check local storage
  let todos = checkLocal("progress");
  //Add todo to local storage
  todos.push(todo);
  localStorage.setItem("progress", JSON.stringify(todos));
}

function saveLocalStorageDone(todo) {
  //Check local storage
  let todos = checkLocal("done");
  //Add todo to local storage
  todos.push(todo);
  localStorage.setItem("done", JSON.stringify(todos));
}

//Get todos to planned, in-progress and done lists
function getLocalTodos() {
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

function getLocalProgressTodos() {
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

function getLocalDoneTodos() {
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
function removeLocalTodos(todo) {
  //Check local storage
  let todos = checkLocal("todos");
  //Delete item from local storage
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalProgressTodos(todo) {
  //Check local storage
  let todos = checkLocal("progress");
  //Delete item from local storage
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem("progress", JSON.stringify(todos));
}

function removeLocalDoneTodos(todo) {
  //Check local storage
  let todos = checkLocal("done");
  //Delete item from local storage
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem("done", JSON.stringify(todos));
}
// localStorage.clear();
