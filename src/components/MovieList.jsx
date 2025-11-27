import MovieItem from "./MovieItem.jsx";

export default function MovieList({movies}) {
  if(movies.length <= 0) {
    return;
  }
  if (!Array.isArray(movies) || movies.length === 0){
    console.log("not an array");
   return null; 
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((item) => (
          <div className=" p-1" key={item.imdbID}>
            <MovieItem item={item} />
          </div>
        ))}
    </div>
  );
}