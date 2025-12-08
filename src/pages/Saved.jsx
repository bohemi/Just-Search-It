// SavedList.jsx — example implementation
export default function SavedList({ watchList = [], remove, markWatched }) {
  if (!watchList || watchList.length === 0) {
    return <div className="p-4 text-center">Your saved list is empty.</div>;
  }

  return (
    <div className="space-y-4 p-4 bg-blue-300 h-screen">
      {watchList.map((m) => (
        <div
          key={m.id}
          className={`flex gap-4 p-2 rounded border ${
            m.watched ? "bg-teal-300" : ""
          }`}
        >
          {m.poster ? (
            <img
              src={m.poster}
              alt={m.title}
              className="w-24 h-32 object-cover"
            />
          ) : (
            <div className="w-24 h-32 bg-gray-200 flex items-center justify-center">
              No Img
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-bold">{m.title}</h3>
            <p className="text-sm text-gray-600">{m.year}</p>
            <div className="mt-2 flex gap-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => markWatched(m.id)}
              >
                {m.watched ? "Unmark Watched" : "Mark Watched"}
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => remove(m.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
