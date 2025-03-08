import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setSourceFilter } from "../../slices/articlesSlice";

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

  const handleSourceChange = (sourceId: string) => {
    dispatch(setSourceFilter(sourceId));
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
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        {activeSource
          ? availableSources.find((s) => s.id === activeSource)?.name
          : "All Sources"}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-xl w-56 animate-fade-in"
      >
        <li className="menu-title">
          <span>Select Source</span>
        </li>
        <li>
          <a
            onClick={() => handleSourceChange("")}
            className={!activeSource ? "active font-medium" : ""}
          >
            All Sources
          </a>
        </li>
        {availableSources.map((source) => (
          <li key={source.id}>
            <a
              onClick={() => handleSourceChange(source.id)}
              className={activeSource === source.id ? "active font-medium" : ""}
            >
              {source.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
