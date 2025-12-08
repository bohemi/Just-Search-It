import { useEffect, useRef, useState } from "react";
import fetchItems from "../api/fetchItems";

function ItemDetails({
  showItemDetails,
  item,
  setSelectedItem,
  setShowItemDetails,
}) {
  if (!showItemDetails || !item) {
    console.log("Empty Details page");
    return;
  }
  const [plot, setPlot] = useState(item.plot || "");
  const [videoId, setVideoId] = useState(null);
  // using ref because we dont need the re-render here.
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchBigPlot = async () => {
      const response = await fetchItems({
        id: item.id || item.imdbID,
        plotSize: "full",
      });

      if (response) {
        setPlot(response.Plot);

        console.log(response);
      }
    };
    fetchBigPlot();
    
    // fetch YouTube trailer for this item title
    // cancels pending requests if we use or fetch new requests then the old request will not conflict
    const controller = new AbortController();
    const fetchTrailer = async () => {
      const key = import.meta.env.VITE_YT_KEY;
      if (!key || !item.title) return;
      try {
        // add trailer in the end of the search term to get the triler of the title
        const q = `${item.title} trailer`;
        const params = new URLSearchParams({
          part: "snippet",
          q,
          key,
          maxResults: "1",
          type: "video",
        });
        const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          console.warn("YT search failed", res.status);
          return;
        }
        const data = await res.json();
        const vid = data?.items?.[0]?.id?.videoId || null;
        setVideoId(vid);
      } catch (err) {
        if (err.name !== "AbortError") console.error("YT fetch error", err);
      }
    };
    fetchTrailer();
    // useEffect cleanup function on abort
    return () => controller.abort();
  }, [item.id, item.imdbID]);

  const closeOverlay = () => {
    setShowItemDetails(false);
    setSelectedItem(null);
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeOverlay();
    }
  };

  /* This container is actually covering the whole screen but with less opacity.
so when we click on this div it checks if the click was inside the below div or outside of the below div
and will close based on that because inner div is holding the "ref" of "modalRef" and if the click
happens outside of the inner div then "!modalRef.current.contains(e.target)" this line will be opposite */
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2 w-1/2 h-2/2 max-h-[80vh] bg-blue-300 rounded border 
        p-4 z-50 flex flex-col overflow-hidden"
      >
        <button
          onClick={closeOverlay}
          className="self-end bg-red-400 p-2 rounded hover:bg-red-500 mb-2"
        >
          Close
        </button>

        {/* scrollable content */}
        <div className="overflow-y-auto">
          <div className="flex justify-center gap-2">
            <img
              src={item.poster}
              alt={item.title || "poster"}
              className="object-fit rounded mb-3"
            />
          </div>
          {videoId ? (
            <div className="mb-3 flex justify-center">
              <iframe
                width="80%"
                height="260"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${item.title} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="mb-3 text-sm text-gray-600">Video not found</div>
          )}
          <h3 className="font-bold text-center text-lg mb-2">
            {item.title || "Movie name N/A"}{" "}
            <small className="text-sm">
              ({item.year || "Release date N/A"})
            </small>
          </h3>
          <p className="text-sm mb-4">{plot || "No summary available."}</p>
          <div className="grid gap-2 font-bold">
            <p>
              <span className="font-bold">Director:</span> {item.director}
            </p>
            <p>
              <span className="font-bold">Box-office:</span> {item.boxOffice}
            </p>
            <p>
              <span className="font-bold">IMDB-rating:</span> {item.imdbRating}
            </p>
            <p>
              <span className="font-bold">Length:</span> {item.runTime}
            </p>
            <p>
              <span className="font-bold">Actors:</span> {item.actors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemDetails;
