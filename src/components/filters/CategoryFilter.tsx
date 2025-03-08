import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setCategoryFilter } from "../../slices/articlesSlice";

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
      .sort();
  }, [items]);

  const handleCategoryChange = (category: string) => {
    dispatch(setCategoryFilter(category));
  };

  return (
    <div className="dropdown dropdown-center">
      <label
        tabIndex={0}
        className="btn btn-ghost gap-2 capitalize hover:bg-primary/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        {activeCategory || "All Categories"}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-xl w-56 animate-fade-in"
      >
        <li className="menu-title">
          <span>Select Category</span>
        </li>
        <li>
          <a
            onClick={() => handleCategoryChange("")}
            className={!activeCategory ? "active font-medium" : ""}
          >
            All Categories
          </a>
        </li>
        {availableCategories.map((category) => (
          <li key={category}>
            <a
              onClick={() => handleCategoryChange(category)}
              className={
                activeCategory === category ? "active font-medium" : ""
              }
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
