import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setSourceFilter } from "../../slices/articlesSlice";
import { FilterDropdown } from "./FilterDropdown";
import { BookIcon } from "../../assets/Icons";

export const SourceFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeSource = useAppSelector(
    (state) => state.articles.activeFilters.source,
  );
  const items = useAppSelector((state) => state.articles.items);

  const availableSources = useMemo(() => {
    const sourcesMap = new Map(
      items.map((article) => [
        article.source.toLowerCase().replace(/\s+/g, "-"),
        {
          id: article.source.toLowerCase().replace(/\s+/g, "-"),
          name: article.source,
        },
      ]),
    );
    const sources = Array.from(sourcesMap.values());

    return Array.from(sources).sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return (
    <FilterDropdown
      label="All Sources"
      icon={<BookIcon className="h-4 w-4" />}
      options={availableSources}
      value={activeSource || ""}
      onChange={(sourceId) => dispatch(setSourceFilter(sourceId))}
      title="Select Source"
      testId="source-filter-trigger"
    />
  );
};
