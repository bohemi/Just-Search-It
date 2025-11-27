import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import MovieList from "../components/MovieList.jsx";

// omdb APIKey -- 9caeb6ca

// omdb data Title: 'Braveheart', Year: '1995', Type: 'movie',
// Poster: 'https://m.media-amazon.com/images/M/MV5BNGMxZDBhNG…WI4NDEtNmUzNWM2NTdmZDA0XkEyXkFqcGc@._V1_SX300.jpg'}

// omdb req -- http://www.omdbapi.com/?apikey=9caeb6ca&s=spiderman
// tvdb -- API - 6d6cb26a-33d0-426f-8e84-ebd0ffa53aca

const moviesArray = [
  {
    id: 1,
    title: "SpiderMan",
    year: "2002",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNmY2YmE3NzgtYTE3Ny00MGY0LTk0MmQtYTI5NTc0MDQ5ZmM4XkEyXkFqcGc@._V1_QL75_UX145_.jpg",
  },
  {
    id: 2,
    title: "BatMan Begins",
    year: "2005",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjEwNjA2NTk1OV5BMl5BanBnXkFtZTcwNzUwMzQ4MQ@@._V1_QL75_UX151_.jpg",
  },
  {
    id: 3,
    title: "Heat",
    year: "1995",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMzMwMzY4OTE1N15BMl5BanBnXkFtZTYwNDY0NTM5._V1_QL75_UX117_.jpg",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  // gets its props fill from searchbar file
  const getSearchTerm = (term) => {
    setLoading(true);
    fetchMovies({ name: term, setLoading, setMovies });
    setSearchTerm(term);
    // simple local filter for now:
    const filtered = moviesArray.filter((m) =>
      m.title.toLowerCase().includes(term.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="h-full bg-blue-300 p-2 text-center">
        <div>Loading...</div>
        <MovieList movies={movies} />
      </div>
    );
  }

  return (
    <div className="h-full bg-blue-300 p-2">
      <SearchBar onSearch={getSearchTerm} />
      <MovieList movies={movies} />
    </div>
  );
}

async function fetchMovies({ name, setLoading, setMovies }) {
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=9caeb6ca&s=${name}`
    ); // Example API
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } else {
      const result = await res.json();

      // now here we spread the result.search data so it gives us linear non-nested array
      // if we dont do this then all the array will store inside one array object.
      setMovies((prev) => [...prev, ...(result.Search || [])]);
    }
  } catch (err) {
    console.error("Error during fetching: ", err.message);
  } finally {
    setLoading(false);
  }
}
