import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setDateFilter } from "../../store/slices/articlesSlice";
import { FilterDropdown } from "./FilterDropdown";
import { CalendarIcon } from "../../assets/Icons";

export const DateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortOrder = useAppSelector(
    (state) => state.articles.activeFilters.dateSort || "desc",
  );

  const options = [
    {
      id: "desc",
      name: "Newest First",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      id: "asc",
      name: "Oldest First",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
  ];

  return (
    <FilterDropdown
      label={sortOrder === "desc" ? "Newest First" : "Oldest First"}
      icon={<CalendarIcon className="h-4 w-4" />}
      options={options}
      value={sortOrder}
      onChange={(order) => dispatch(setDateFilter(order as "asc" | "desc"))}
      title="Sort by Date"
      allOptionLabel="Default Order"
      testId="date-filter-trigger"
    />
  );
};
