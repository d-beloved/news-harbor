import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

interface UseSearchProps {
  initialTerm?: string;
  onSearch: (term: string) => void;
  debounceTime?: number;
}

export const useSearch = ({
  initialTerm = "",
  onSearch,
  debounceTime = 1000,
}: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term.trim().toLowerCase());
    }, debounceTime),
    [onSearch, debounceTime],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearch,
  };
};
