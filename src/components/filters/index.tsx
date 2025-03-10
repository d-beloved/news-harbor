import React from "react";
import { CategoryFilter } from "./CategoryFilter";
import { DateFilter } from "./DateFilter";
import { SourceFilter } from "./SourceFilter";

const FILTERS = [
  { Component: CategoryFilter },
  { Component: SourceFilter },
  { Component: DateFilter },
] as const;

export const Filters: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center p-6 bg-base-200/50 backdrop-blur-sm rounded-xl shadow-sm animate-fade-in relative z-[999] transition-colors duration-50">
      <div className="text-sm text-base-content/60">
        Filter news by available results
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        {FILTERS.map(({ Component }, index) => (
          <Component key={index} />
        ))}
      </div>
    </div>
  );
};
