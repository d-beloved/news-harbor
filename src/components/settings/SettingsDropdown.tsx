import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { updatePreferences } from "../../slices/preferencesSlice";
import { CATEGORIES, SOURCES } from "../../constants";

export const SettingsDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.preferences);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    preferences.preferredCategories || [],
  );
  const [selectedSources, setSelectedSources] = useState<string[]>(
    preferences.preferredSources || [],
  );

  const handleDropdownToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(e.target.checked);
    if (!e.target.checked) {
      setSelectedCategories(preferences.preferredCategories || []);
      setSelectedSources(preferences.preferredSources || []);
    }
  };

  const handleSave = () => {
    dispatch(
      updatePreferences({
        preferredCategories: selectedCategories,
        preferredSources: selectedSources,
      }),
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((s) => s !== sourceId)
        : [...prev, sourceId],
    );
  };

  return (
    <div className="dropdown dropdown-end">
      <input
        type="checkbox"
        className="hidden"
        checked={isOpen}
        onChange={handleDropdownToggle}
      />
      <label tabIndex={0} className="btn btn-ghost gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        My Preference
      </label>

      <div
        tabIndex={0}
        className="dropdown-content z-[1] card w-96 p-4 shadow bg-base-100"
      >
        <div className="card-body gap-6">
          <h3 className="card-title text-lg font-bold border-b pb-2">
            Customize Your News Feed
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`btn btn-sm ${
                      selectedCategories.includes(category)
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">News Sources</h4>
              <div className="flex flex-wrap gap-2">
                {SOURCES.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => handleSourceToggle(source.id)}
                    className={`btn btn-sm ${
                      selectedSources.includes(source.id)
                        ? "btn-secondary"
                        : "btn-outline"
                    }`}
                  >
                    {source.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card-actions justify-between mt-4 pt-2 border-t">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedSources([]);
              }}
            >
              Reset
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
