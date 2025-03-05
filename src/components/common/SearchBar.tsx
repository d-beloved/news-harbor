import React, { useState } from "react";
import { useArticles } from "../../hooks/useArticles";

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      useArticles({ keyword: searchTerm });
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
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};
