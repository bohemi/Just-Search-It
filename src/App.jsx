import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Saved from "./pages/Saved.jsx";
import { useEffect, useState } from "react";

function App() {
  // runs the inside function only on mount. basically retreievs the value
  // of whatever the function returns
  const [watchList, setWatchList] = useState(() => {
    try {
      const raw = localStorage.getItem("watchList");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  // normalize and toggle save
  const toggleSave = (item) => {
    setWatchList((prev) => {
      const idStr = String(item.id || item.imdbID || Date.now());
      const exists = prev.find((m) => String(m.id) === idStr);
      if (exists) {
        // unsave
        return prev.filter((m) => String(m.id) !== idStr);
      } else {
        // add normalized object
        const toSave = {
          id: idStr,
          title: item.title || item.Title || "Untitled",
          year:
            item.year ||
            item.Year || "",
          poster: item.poster || item.Poster || null,
          watched: false,
        };
        return [toSave, ...prev];
      }
    });
  };

  const removeFromWatchList = (id) => {
    setWatchList((prev) => prev.filter((m) => m.id !== id));
  };

  // no actual change in functionality, just reduces opacity, changes text decoration
  // and will trigger the setWatchList to update the state
  const markWatched = (id) => {
    setWatchList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, watched: !m.watched } : m))
    );
  };

  return (
    <div className="">
      <h1 className="text-center font-bold text-2xl p-2">Just-Search-It</h1>
      <nav className="p-2 bg-blue-400 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/saved">Saved</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home onToggleSave={toggleSave} watchList={watchList} />}
        />
        <Route
          path="/saved"
          element={
            <Saved
              watchList={watchList}
              remove={removeFromWatchList}
              markWatched={markWatched}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
