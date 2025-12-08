import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce.js";

export default function SearchBar({ onFind }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (searchTerm.length > 2 && debouncedSearchTerm) {
      onFind(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onFind]);

  return (
    <div className="flex justify-center gap-3">
      <input
        className="border border-dotted bg-blue-200 rounded text-center hover:bg-blue-100 p-1"
        placeholder="Search..."
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
