import { populateWeather } from "../data/weatherData.mjs";
import { loadSong } from "../handler/musicLoader.mjs";
import {
  getLocalTodos,
  getLocalProgressTodos,
  getLocalDoneTodos,
} from "../handler/localStorageHandler.mjs";

//SELECTORS
const preloader = document.querySelector(".preloader");
let city;

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getLocalTodos);
document.addEventListener("DOMContentLoaded", getLocalProgressTodos);
document.addEventListener("DOMContentLoaded", getLocalDoneTodos);
window.onload = function () {
  populateWeather((city = "amsterdam"));
  loadSong((city = "amsterdam"));
  setTimeout(() => {
    preloader.style.display = "none";
  }, 3000);
};
