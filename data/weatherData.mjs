import { WEATHER_API_KEY } from "../src/constant.mjs";
import { fetchUrl } from "../data/fetchData.mjs";

//Selectors
const searchButton = document.querySelector(".search button");
const searchBar = document.querySelector(".search-bar");

//Populate the weather data on the page
export async function populateWeather(city) {
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
export async function searchWeather() {
  const city = document.querySelector(".search-bar").value;
  await populateWeather(city);
}

//Event listeners
searchButton.addEventListener("click", searchWeather);
searchBar.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchWeather();
  }
});
