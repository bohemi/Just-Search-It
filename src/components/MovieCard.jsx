export default function MovieCard({
  item,
  onToggleSave,
  isSaved,
  setShowItemDetails,
  setSelectedItem,
}) {
  const poster = item.poster || null;

  const clickedItem = () => {
    setSelectedItem(item);
    setShowItemDetails(true);
    console.log("clicked");
  };
  

  return (
    <div
      className="flex flex-col justify-around p-3 gap-2 border rounded bg-blue-300"
      onClick={clickedItem}
    >
      {poster ? (
        <img
          src={poster}
          alt={item.title || "poster"}
          className="object-fit"
        />
      ) : (
        <div className="h-48 flex items-center justify-center bg-gray-200">
          No Image
        </div>
      )}
      <h3 className="font-bold text-center">
        {item.title || "Movie name N/A"}{" "}
        <small className="text-sm">({item.year || "Release date N/A"})</small>
      </h3>
      <button
        className={`py-1 rounded ${
          isSaved ? "bg-red-500 text-white" : "bg-blue-500 text-white"
        }`}
        // give the item to local storage on click
        onClick={() => onToggleSave(item)}
      >
        {isSaved ? "Unsave" : "Save"}
      </button>
      <p className="text-sm">{item.plot || "No summary available."}</p>
    </div>
  );
}
