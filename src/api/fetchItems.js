
async function fetchItems({ name, id, plotSize = "short" }) {
  // using params incase user types "&" or any kind of keyword in search which will
  // not give results because of special keywords

  const nameParams = new URLSearchParams({
    s: name
  });
  const key = import.meta.env.VITE_MOVIE_KEY;

  try {
    if (name) {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&${nameParams.toString()}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (data.Response === "False") {
        console.warn("No results returned", data.Error);
        return null;
      }
      return data;
    }

    if (id) {
      const res = await fetch(
        // by default returns short summary of a movie or show
        `https://www.omdbapi.com/?apikey=${key}&i=${id}&plot=${plotSize}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (data.Response === "False") {
        console.warn("No results returned", data.Error);
        return null;
      }
      return data;
    }

  } catch (err) {
    console.error(`Fetch Error${id?"on ID": "on name"}:`, err);
    return null;
  }
}

export default fetchItems;