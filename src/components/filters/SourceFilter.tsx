import React from "react";
import { useAppSelector } from "../../hooks/store.hook";
import { useArticles } from "../../hooks/useArticles";
import { SOURCES } from "../../constants";

export const SourceFilter: React.FC = () => {
  const selectedSource = useAppSelector(
    (state) => state.articles.filters?.source,
  );

  const handleSourceChange = (sourceId: string) => {
    useArticles({ source: sourceId });
  };

  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn btn-ghost m-1">
        Source: {SOURCES.find((s) => s.id === selectedSource)?.name || "All"}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => handleSourceChange("")}>All Sources</a>
        </li>
        {SOURCES.map((source) => (
          <li key={source.id}>
            <a
              onClick={() => handleSourceChange(source.id)}
              className={selectedSource === source.id ? "active" : ""}
            >
              {source.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
