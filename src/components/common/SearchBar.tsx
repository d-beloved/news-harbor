import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useArticlesContext } from "../../context/ArticlesContext";
import { SearchIcon } from "../../assets/Icons";

export const SearchBar: React.FC = () => {
  const { loading, setSearchRequest, searchRequest } = useArticlesContext();
  const [searchTerm, setSearchTerm] = useState(searchRequest || "");

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchRequest(term.trim().toLowerCase());
    }, 1000),
    [setSearchRequest],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedSearch.cancel();
    setSearchRequest(searchTerm.trim().toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={"Search for news articles..."}
        className="input input-bordered w-full px-4 focus:input-primary transition-all duration-300 rounded-4xl focus:outline-none"
        disabled={loading}
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        {loading && searchTerm ? (
          <span
            data-testid="loading-spinner"
            className="loading loading-spinner loading-sm text-primary"
          ></span>
        ) : (
          <SearchIcon className="h-5 w-5 text-base-content/50" />
        )}
      </div>
    </form>
  );
};
