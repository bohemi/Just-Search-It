import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import MovieList from "../components/MovieList.jsx";
import fetchItems from "../api/fetchItems.js";
import ItemDetails from "./ItemDetails.jsx";
import { Await } from "react-router-dom";

export default function Home({ onToggleSave, watchList }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [validSearch, setValidSearch] = useState("");
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [caching, setCaching] = useState([]);

  // gets its props fill from searchbar file
  const searchingBehaviour = async (term) => {
    setLoading(true);
    // get a bulk of 10 items from API
    const searchResults = await fetchItems({ name: term });

    if (!searchResults || searchResults.Response === "False") {
      setValidSearch("No results! Try different keywords");
      setLoading(false);
      return;
    }

    const normalized = (searchResults.Search || []).map((r) => ({
      id: r.imdbID,
      title: r.Title,
      year: r.Year,
      plot: r.Plot || "Plot loading...",
      poster: r.Poster,
    }));
    setValidSearch(`Found ${searchResults.Search.length} results`);
    setItems(normalized);
    setLoading(false);

    // to get the plot of movies/shows the OMDB gives when fetch with imdbID/title provided
    // so after getting 10 items above we loop through to get plot but plot fetching will be
    // slower due to multiple fetching so we render the previous data above and in meantime
    // get the plot in background without waiting for all fetches.
    const detailedItems = await Promise.all(
      searchResults.Search.map(async (it)=>{
        try{
          const fullData = await fetchItems({id:it.imdbID});
          return {...it, ...fullData};
        } catch (err) {
          console.error("Error on promise for: detailedItems");
          return it; // fallback
        }
      })
    );

    // we will normalize the data to have consistent keys
    const normalizedFull = (detailedItems).map((r) => ({
      id: r.imdbID,
      title: r.Title,
      year: r.Year,
      plot: r.Plot || "Plot not available",
      boxOffice: r.BoxOffice,
      imdbRating: r.imdbRating,
      runTime: r.Runtime,
      genre: r.Genre,
      director: r.Director,
      actors: r.Actors,
      poster: r.Poster,
    }));
    setItems(normalizedFull);
  };

  if (loading) {
    return (
      <div className="h-screen p-2">
        <SearchBar onFind={searchingBehaviour} />
        <p className=" text-2xl text-center">Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="h-screen p-2">
        <ItemDetails
          showItemDetails={showItemDetails}
          item={selectedItem}
          setSelectedItem={setSelectedItem}
          setShowItemDetails={setShowItemDetails}
          setCaching={setCaching}
          caching={caching}
        />
        <SearchBar onFind={searchingBehaviour} />
        <p className="text-center text-lg">{validSearch}</p>
        <MovieList
          items={items}
          onToggleSave={onToggleSave}
          watchList={watchList}
          setShowItemDetails={setShowItemDetails}
          setSelectedItem={setSelectedItem}
        />
      </div>
    );
  }
}
