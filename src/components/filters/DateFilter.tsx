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
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn btn-ghost m-1">
        Date: {sortOrder === "desc" ? "Newest First" : "Oldest First"}
      </label>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a
            onClick={() => handleSortChange("desc")}
            className={sortOrder === "desc" ? "active" : ""}
          >
            Newest First
          </a>
        </li>
        <li>
          <a
            onClick={() => handleSortChange("asc")}
            className={sortOrder === "asc" ? "active" : ""}
          >
            Oldest First
          </a>
        </li>
      </ul>
    </div>
  );
};
