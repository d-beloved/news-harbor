import React from "react";
import { useAppSelector } from "../../hooks/store.hook";
import { CATEGORIES } from "../../constants";
import { useArticles } from "../../hooks/useArticles";

export const CategoryFilter: React.FC = () => {
  const selectedCategory = useAppSelector(
    (state) => state.articles.filters?.category,
  );

  const handleCategoryChange = (category: string) => {
    useArticles({ category });
  };

  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn btn-ghost m-1">
        Category: {selectedCategory || "All"}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => handleCategoryChange("")}>All</a>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category}>
            <a
              onClick={() => handleCategoryChange(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
