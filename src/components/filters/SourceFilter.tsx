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
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn btn-ghost m-1">
        Source:{" "}
        {activeSource
          ? availableSources.find((s) => s.id === activeSource)?.name ||
            activeSource
          : "All"}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => handleSourceChange("")}>All Sources</a>
        </li>
        {availableSources.map((source) => (
          <li key={source.id}>
            <a
              onClick={() => handleSourceChange(source.id)}
              className={activeSource === source.id ? "active" : ""}
            >
              {source.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
