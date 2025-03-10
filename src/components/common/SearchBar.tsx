import React from "react";
import { useArticlesContext } from "../../context/ArticlesContext";
import { useSearch } from "../../hooks/useSearch";
import { SearchInput } from "./SearchInput";

export const SearchBar: React.FC = () => {
  const { loading, setSearchRequest, searchRequest } = useArticlesContext();

  const { searchTerm, setSearchTerm, debouncedSearch } = useSearch({
    initialTerm: searchRequest || "",
    onSearch: setSearchRequest,
  });

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
      <SearchInput
        value={searchTerm}
        onChange={handleChange}
        disabled={loading}
        loading={loading}
      />
    </form>
  );
};
