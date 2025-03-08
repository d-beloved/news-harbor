import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setDateFilter } from "../../slices/articlesSlice";

export const DateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortOrder = useAppSelector(
    (state) => state.articles.activeFilters.dateSort || "desc",
  );

  const handleSortChange = (order: "asc" | "desc") => {
    dispatch(setDateFilter(order === sortOrder ? undefined : order));
  };

  return (
    <div className="dropdown dropdown-center">
      <label tabIndex={0} className="btn btn-ghost gap-2 hover:bg-primary/10">
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {sortOrder === "desc" ? "Newest First" : "Oldest First"}
      </label>
      <ul className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-xl w-56 animate-fade-in">
        <li className="menu-title">
          <span>Sort by Date</span>
        </li>
        <li>
          <a
            onClick={() => handleSortChange("desc")}
            className={sortOrder === "desc" ? "active font-medium" : ""}
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
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            Newest First
          </a>
        </li>
        <li>
          <a
            onClick={() => handleSortChange("asc")}
            className={sortOrder === "asc" ? "active font-medium" : ""}
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
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            Oldest First
          </a>
        </li>
      </ul>
    </div>
  );
};
