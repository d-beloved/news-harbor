import React, { useState } from "react";
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

  const handleDropdownToggle = () => {
    setIsOpen((prev) => {
      if (prev) {
        setSelectedCategories(preferences.preferredCategories || []);
        setSelectedSources(preferences.preferredSources || []);
      }
      return !prev;
    });
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
      <label
        tabIndex={0}
        className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/50"
        onClick={handleDropdownToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-70"
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
        <span className="hidden md:inline">Preferences</span>
      </label>

      <div
        tabIndex={0}
        className="dropdown-content z-[100] card w-80 md:w-96 shadow-2xl bg-base-100 animate-fade-in"
      >
        <div className="card-body gap-6 p-6">
          <h3 className="card-title text-lg font-bold border-b border-base-200 pb-3">
            Customize Your Feed
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3 text-sm text-base-content/70">
                Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`btn btn-sm normal-case transition-all duration-200 ${
                      selectedCategories.includes(category)
                        ? "btn-primary shadow-lg hover:shadow-xl"
                        : "btn-ghost hover:bg-primary/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-sm text-base-content/70">
                News Sources
              </h4>
              <div className="flex flex-wrap gap-2">
                {SOURCES.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => handleSourceToggle(source.id)}
                    className={`btn btn-sm normal-case transition-all duration-200 ${
                      selectedSources.includes(source.id)
                        ? "btn-secondary shadow-lg hover:shadow-xl"
                        : "btn-ghost hover:bg-secondary/10"
                    }`}
                  >
                    {source.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card-actions justify-between mt-4 pt-4 border-t border-base-200">
            <button
              className="btn btn-sm btn-ghost hover:bg-error/10 hover:text-error transition-colors"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedSources([]);
              }}
            >
              Reset All
            </button>
            <button
              className="btn btn-sm btn-primary hover:shadow-lg transition-all"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
