import { useMemo } from "react";
import MovieCard from "./MovieCard.jsx";

export default function MovieList({
  items = [],
  onToggleSave,
  watchList = [],
  setShowItemDetails,
  setSelectedItem,
}) {
  if (!items || items.length <= 0) {
    return <p></p>;
  }

  const savedIdSet = useMemo(() => {
    const s = new Set(watchList.map((w) => String(w.id)));

    return s;
  }, [watchList]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 h-screen">
      {items.map((m) => {
        const idKey = String(m.id || "");
        // useMemo will process every watchList items and checks if the user have
        // saved an item in watchList(local storage) then it will have the id and
        // isSaved will be true leading to changes in button text and color and vice versa
        const isSaved = savedIdSet.has(String(idKey));
        return (
          <MovieCard
            key={idKey}
            item={m}
            onToggleSave={onToggleSave}
            isSaved={isSaved}
            setShowItemDetails={setShowItemDetails}
            setSelectedItem={setSelectedItem}
          />
        );
      })}
    </div>
  );
}
