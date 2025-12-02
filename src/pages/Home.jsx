import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import MovieList from "../components/MovieList.jsx";

export default function Home({ onToggleSave, watchList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [validSearch, setValidSearch] = useState("");

  // gets its props fill from searchbar file
  const searchingBehaviour = (term) => {
    if (term.trim().length <= 2) {
      setItems([]);
      setValidSearch("Please enter more than 2 words");
      return;
    }
    setValidSearch("");
    setLoading(true);
    setSearchTerm(term);
    // clear old items
    setItems([]);
    FetchItems({ name: term, setItems, setLoading, setValidSearch });
  };
  console.log("Items ",items);
  
  {
    return loading ? (
      <Loader />
    ) : (
      <div className="h-screen p-2">
        <SearchBar onFind={searchingBehaviour} />
        <p className="text-center text-lg">{validSearch}</p>
        <MovieList
          items={items}
          searchTerm={searchTerm}
          onToggleSave={onToggleSave}
          watchList={watchList}
        />
      </div>
    );
  }
}

function Loader() {
  return (
    <div className="p-5 text-center h-screen">
      <p className="text-3xl">Loading...</p>
    </div>
  );
}

async function FetchItems({ name, setLoading, setItems, setValidSearch }) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=9caeb6ca&s=${name}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    console.log("API succcess ", result);

    if (result.Response === "False") {
      console.log("API fail ", result);
      setValidSearch("Oops!! " + result.Error);
      setLoading(false);
      return;
    }
    // we will normalize the data here
    const normalized = (result.Search || []).map((r) => ({
      id: r.imdbID,
      title: r.Title,
      year: r.Year,
      // change it later there cant be actual "N/A" value in returned data
      poster: r.Poster !== "N/A" ? r.Poster : null
    }));
    setItems(normalized);
  } catch (err) {
    console.error("Error during fetching: ", err.message);
  } finally {
    setLoading(false);
  }
}
