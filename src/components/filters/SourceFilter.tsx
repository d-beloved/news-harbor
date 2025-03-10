import React from "react";
import { useFilter } from "../../hooks/useFilter";
import { setSourceFilter } from "../../store/slices/articlesSlice";
import { FilterDropdown } from "./FilterDropdown";
import { BookIcon } from "../../assets/Icons";
import { useAppSelector } from "../../hooks/store.hook";

export const SourceFilter: React.FC = () => {
  const { activeFilter, options, handleChange } = useFilter({
    items: useAppSelector((state) => state.articles.items),
    filterKey: "source",
    activeFilterSelector: (state) => state.articles.activeFilters.source,
    dispatchAction: setSourceFilter,
  });

  return (
    <FilterDropdown
      label="All Sources"
      icon={<BookIcon className="h-4 w-4" />}
      options={options}
      value={activeFilter || ""}
      onChange={handleChange}
      title="Select Source"
      testId="source-filter-trigger"
    />
  );
};
