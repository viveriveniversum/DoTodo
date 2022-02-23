import { GIPHY_API_KEY } from "../src/constant.mjs";
import { fetchUrl } from "../data/fetchData.mjs";
// Populate Gif
export async function populateGif(mood = "go") {
  try {
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
  } catch (e) {
    console.log(e);
  }
}
