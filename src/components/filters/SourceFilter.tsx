import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { fetchArticles } from "../../slices/articlesSlice";

const sources = [
  { id: "nyt", name: "New York Times" },
  { id: "guardian", name: "The Guardian" },
  { id: "newsapi", name: "News API" },
];

export const SourceFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedSource = useAppSelector(
    (state) => state.articles.filters?.source,
  );

  const handleSourceChange = (sourceId: string) => {
    dispatch(fetchArticles({ source: sourceId }));
  };

  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn btn-ghost m-1">
        Source: {sources.find((s) => s.id === selectedSource)?.name || "All"}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => handleSourceChange("")}>All Sources</a>
        </li>
        {sources.map((source) => (
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
