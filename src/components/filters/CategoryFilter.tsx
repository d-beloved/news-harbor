import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setCategoryFilter } from "../../slices/articlesSlice";
import { FilterDropdown } from "./FilterDropdown";
import { MenuIcon } from "../../assets/Icons";

export const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(
    (state) => state.articles.activeFilters?.category,
  );
  const items = useAppSelector((state) => state.articles.items);

  const availableCategories = useMemo(() => {
    const categories = new Set(
      items.map((article) => article.category).filter(Boolean),
    );
    return Array.from(categories)
      .filter((cat) => cat !== undefined)
      .sort()
      .map((cat) => ({ id: cat, name: cat }));
  }, [items]);

  return (
    <FilterDropdown
      label="All Categories"
      icon={<MenuIcon className="h-4 w-4" />}
      options={availableCategories}
      value={activeCategory || ""}
      onChange={(category) => dispatch(setCategoryFilter(category))}
      title="Select Category"
      testId="dropdown-trigger"
    />
  );
};
