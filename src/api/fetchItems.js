
async function fetchItems({ name, id, plotSize="short" }) {
  // using params incase user types "&" keyword in search which will
  // not give use results instead will be added as a part of call method
  const naemParams = new URLSearchParams({
    s: name
  });
  const key = import.meta.env.VITE_MOVIE_KEY;
  if (id) {
    try {
      const res = await fetch(
        // by default returns short summary of a movie or show
        `https://www.omdbapi.com/?apikey=${key}&i=${id}&plot=${plotSize}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      // console.log("API succcess ", result);

      if (result.Response === "False") {
        console.log("API fail ", result);
        return result.Error;
      }
      return result;

    } catch (err) {
      console.error("Error during fetching: ", err.message);
    }
  }
  else {
    try {
      const res = await fetch(
        // by default returns short summary of a movie or show
        `https://www.omdbapi.com/?apikey=${key}&${naemParams.toString()}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      // console.log("API succcess ", result);
      return result;
      
    } catch (err) {
      console.error("Error during fetching: ", err.message);
    }
    
  }
}

export default fetchItems;