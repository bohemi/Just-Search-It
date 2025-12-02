export default function MovieCard({ item, onToggleSave, isSaved }) {
  const poster = item.poster || null;

  return (
    <div className="p-3 border rounded bg-blue-300">
      {poster ? (
        <img
          src={poster}
          alt={item.title || "poster"}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="h-48 flex items-center justify-center bg-gray-200">
          No Image
        </div>
      )}
      <h3 className="mt-2 font-bold">
        {item.title || item.name}{" "}
        <small className="text-sm">
          ({String(item.year || "").slice(0, 4)})
        </small>
      </h3>
      <div className="mt-2">
        <button
          className={`px-2 py-1 rounded ${
            isSaved ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}
          // give the item to local storage on click
          onClick={() => onToggleSave(item)}
        >
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>
    </div>
  );
}
