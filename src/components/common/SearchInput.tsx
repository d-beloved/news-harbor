import React from "react";
import { SearchIcon } from "../../assets/Icons";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  disabled = false,
  loading = false,
  placeholder = "Search for news articles...",
  className = "",
}) => (
  <div className="relative w-full">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input input-bordered w-full px-4 focus:input-primary transition-all duration-300 rounded-4xl focus:outline-none ${className}`}
      disabled={disabled}
    />
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      {loading && value ? (
        <span
          data-testid="loading-spinner"
          className="loading loading-spinner loading-sm text-primary"
        />
      ) : (
        <SearchIcon
          dataTestId="search-icon"
          className="h-5 w-5 text-base-content/50"
        />
      )}
    </div>
  </div>
);
