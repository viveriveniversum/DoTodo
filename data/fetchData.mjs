//Fetch the data
export async function fetchUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return response.json();
}
