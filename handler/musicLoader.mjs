import { WEATHER_API_KEY } from "../src/constant.mjs";
import { fetchUrl } from "../data/fetchData.mjs";

//Selectors
const audio = document.querySelector(".audio");
const musicContainer = document.querySelector(".music-container");
const playButton = document.querySelector("#play");

export async function loadSong(city) {
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
