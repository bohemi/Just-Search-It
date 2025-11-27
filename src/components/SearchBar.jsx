import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const onSearchInputChange = (ev) => {
    setSearchInput(ev.target.value);
  };
  const sendSearchTerm = () => {
    onSearch(searchInput);
  };

  return (
    <div>
      <div className="flex justify-center gap-3">
        <input
          className="border border-dotted bg-blue-200 rounded text-center p-1"
          placeholder="Search..."
          type="text"
          value={searchInput}
          onChange={onSearchInputChange}
        />
        <button
          className="rounded bg-blue-400 p-1 hover:bg-blue-200"
          onClick={sendSearchTerm}
        >
          Find
        </button>
      </div>
    </div>
  );
}
