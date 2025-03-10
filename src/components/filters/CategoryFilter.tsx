import React from "react";
import { useFilter } from "../../hooks/useFilter";
import { setCategoryFilter } from "../../store/slices/articlesSlice";
import { FilterDropdown } from "./FilterDropdown";
import { MenuIcon } from "../../assets/Icons";
import { useAppSelector } from "../../hooks/store.hook";

export const CategoryFilter: React.FC = () => {
  const { activeFilter, options, handleChange } = useFilter({
    items: useAppSelector((state) => state.articles.items),
    filterKey: "category",
    activeFilterSelector: (state) => state.articles.activeFilters?.category,
    dispatchAction: setCategoryFilter,
  });

  return (
    <FilterDropdown
      label="All Categories"
      icon={<MenuIcon className="h-4 w-4" />}
      options={options}
      value={activeFilter || ""}
      onChange={handleChange}
      title="Select Category"
      testId="dropdown-trigger"
    />
  );
};
