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
    <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={"Search for news articles by keyword..."}
        className="input input-bordered w-full px-4 focus:input-primary transition-all duration-300 rounded-4xl focus:outline-none"
        disabled={loading}
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        {loading ? (
          <span className="loading loading-spinner loading-sm text-primary"></span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-base-content/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
    </form>
  );
};
