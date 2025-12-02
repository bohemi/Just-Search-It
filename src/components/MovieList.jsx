import { useMemo } from "react";
import MovieCard from "./MovieCard.jsx";

export default function MovieList({
  items = [],
  searchTerm = "",
  onToggleSave,
  watchList = [],
}) {
  if (!items || items.length <= 0 || searchTerm.trim().length <= 2) {
    return <p className="text-center">No movies found</p>;
  }

  const savedIdSet = useMemo(() => {
    const s = new Set(watchList.map((w) => String(w.id)));
    console.log("in memo");
    
    return s;
  }, [watchList]);

  return (
    <div className="grid grid-cols-3 gap-4 p-2 h-screen">
      {items.map((m) => {
        const idKey = String(m.id || m.imdbID || "");
        // useMemo will run every watchList items and will check if the user have
        // saved an item in watchList(local storage) then it will have the id and
        // isSaved will be true leading to changes in button text and color and vice versa
        const isSaved = savedIdSet.has(String(idKey));
        return (
          <MovieCard
            key={idKey}
            item={m}
            onToggleSave={onToggleSave}
            isSaved={isSaved}
          />
        );
      })}
    </div>
  );
}
