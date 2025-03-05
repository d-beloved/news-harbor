import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { fetchArticles } from "../../slices/articlesSlice";

const categories = [
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
  "Health",
  "Science",
  "Politics",
  "World",
];

export const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.articles.filters?.category,
  );

  const handleCategoryChange = (category: string) => {
    dispatch(fetchArticles({ category }));
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
        {categories.map((category) => (
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
