import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { fetchArticles } from "../../slices/articlesSlice";

export const DateRangeFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dateFrom, dateTo } = useAppSelector(
    (state) => state.articles.filters || {},
  );

  const handleDateChange = (type: "from" | "to", date: string) => {
    const filters = {
      dateFrom: type === "from" ? date : dateFrom,
      dateTo: type === "to" ? date : dateTo,
    };
    dispatch(fetchArticles(filters));
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="form-control">
        <label className="label">
          <span className="label-text">From</span>
        </label>
        <input
          type="date"
          className="input input-bordered"
          value={dateFrom || ""}
          onChange={(e) => handleDateChange("from", e.target.value)}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">To</span>
        </label>
        <input
          type="date"
          className="input input-bordered"
          value={dateTo || ""}
          onChange={(e) => handleDateChange("to", e.target.value)}
        />
      </div>
    </div>
  );
};
