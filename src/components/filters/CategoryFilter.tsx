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
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn btn-ghost m-1">
        Category: {activeCategory || "All"}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => handleCategoryChange("")}>All</a>
        </li>
        {availableCategories.map((category) => (
          <li key={category}>
            <a onClick={() => handleCategoryChange(category)}>{category}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
