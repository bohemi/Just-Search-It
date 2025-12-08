import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import MovieList from "../components/MovieList.jsx";
import fetchItems from "../api/fetchItems.js";
import ItemDetails from "./ItemDetails.jsx";

export default function Home({ onToggleSave, watchList }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [validSearch, setValidSearch] = useState("");
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // gets its props fill from searchbar file
  const searchingBehaviour = async (term) => {
    setLoading(true);
    // get a bulk of 10 items from API
    const APIresults = await fetchItems({ name: term });
    if (APIresults.Error) {
      setValidSearch("No results! Try different keywords");
      setLoading(false);
      return;
    }
    for (let i = 0; i < APIresults.Search.length; i++) {
      // omdb needs imdbID to fetch full data. but we can only make one call per imdbID.
      // so, we loop through each item of the APIresults And get our data per call.
      const moreData = await fetchItems({ id: APIresults.Search[i].imdbID });
      APIresults.Search[i] = { ...APIresults.Search[i], ...moreData };
    }

    // we will normalize the data to have consistent keys
    const normalized = (APIresults.Search || []).map((r) => ({
      id: r.imdbID,
      title: r.Title,
      year: r.Year,
      plot: r.Plot,
      boxOffice: r.BoxOffice,
      imdbRating: r.imdbRating,
      runTime: r.Runtime,
      genre: r.Genre,
      director: r.Director,
      actors: r.Actors,
      poster: r.Poster,
    }));

    setValidSearch(`Found ${APIresults.Search.length} results`);
    setItems(normalized);
    setLoading(false);
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
