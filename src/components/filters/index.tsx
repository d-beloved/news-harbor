import React from "react";
import { CategoryFilter } from "./CategoryFilter";
import { DateFilter } from "./DateFilter";
import { SourceFilter } from "./SourceFilter";

export const Filters: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center p-4 bg-base-200 rounded-lg">
      <CategoryFilter />
      <SourceFilter />
      <DateFilter />
    </div>
  );
};
