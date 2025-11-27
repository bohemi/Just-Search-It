
export default function MovieItem({item}) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <img className="object-fit h-48 w-32 p-1 mx-auto" src={item.Poster} alt={item.Title} />
      <div className="p-2 text-center">
        <p className="font-bold">{item.Title}</p>
        <p className="text-sm text-gray-600">{item.Year}</p>
      </div>
    </div>
  );
}