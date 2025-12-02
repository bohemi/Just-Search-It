import { useRef, useState } from "react";

export default function SearchBar({ onFind }) {
  // const [searchInput, setSearchInput] = useState("");

  // const onSearchInputChange = (ev) => {
  //   setSearchInput(ev.target.value);
  // };
  const timerRef = useRef(null);

  const handleInputChange = (ev) => {
    const value = ev.target.value;
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onFind(value);
    }, 500);
  };

  return (
    <div className="flex justify-center gap-3">
      <input
        className="border border-dotted bg-blue-200 rounded text-center hover:bg-blue-100 p-1"
        placeholder="Search..."
        type="text"
        onChange={handleInputChange}
      />
    </div>
  );
}
