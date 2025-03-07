import React, { useState } from "react";
import { useArticles } from "../../hooks/useArticles";

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { loading } = useArticles(
    searchKeyword ? { keyword: searchKeyword } : undefined,
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchKeyword(searchTerm.toLowerCase());
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-2xl">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for news..."
        className="input input-bordered w-full"
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading || !searchTerm}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};
