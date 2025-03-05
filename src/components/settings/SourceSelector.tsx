import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setSources } from "../../slices/preferencesSlice";

const availableSources = [
  { id: "nyt", name: "New York Times" },
  { id: "guardian", name: "The Guardian" },
  { id: "newsapi", name: "News API" },
];

export const SourceSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedSources = useAppSelector((state) => state.preferences.sources);

  const handleSourceToggle = (sourceId: string) => {
    const newSources = selectedSources.includes(sourceId)
      ? selectedSources.filter((id) => id !== sourceId)
      : [...selectedSources, sourceId];

    dispatch(setSources(newSources));
  };

  return (
    <div className="form-control">
      <h3 className="text-lg font-semibold mb-4">Select Your News Sources</h3>
      {availableSources.map((source) => (
        <label
          key={source.id}
          className="label cursor-pointer justify-start gap-4"
        >
          <input
            type="checkbox"
            className="checkbox"
            checked={selectedSources.includes(source.id)}
            onChange={() => handleSourceToggle(source.id)}
          />
          <span className="label-text">{source.name}</span>
        </label>
      ))}
    </div>
  );
};
