import React from "react";
import { CATEGORIES, SOURCES } from "../../constants";
import { SettingsIcon } from "../../assets/Icons";
import { usePreferences } from "../../hooks/usePreferences";
import { PreferenceSection } from "./PreferenceSection";
import { useDropdownState } from "../../hooks/useDropdownState";

export const SettingsDropdown: React.FC = () => {
  const {
    selectedCategories,
    selectedSources,
    setSelectedCategories,
    setSelectedSources,
    resetSelections,
    handleSave,
    handleReset,
  } = usePreferences();

  const { isOpen, setIsOpen, dropdownRef, handleToggle } = useDropdownState({
    onClose: resetSelections,
  });

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

  const handleSaveAndClose = () => {
    handleSave();
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown dropdown-end ${isOpen ? "dropdown-open" : ""}`}
    >
      <button
        className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/50"
        onClick={handleToggle}
      >
        <SettingsIcon className="h-5 w-5 opacity-70" />
        <span className="hidden md:inline">Preferences</span>
      </button>

      <div className="dropdown-content z-[100] card w-80 md:w-96 shadow-2xl bg-base-100 animate-fade-in">
        <div className="card-body gap-4 p-6">
          <h3 className="card-title text-lg font-bold border-b border-base-200">
            Customize Your Feed
          </h3>

          <p className="text-sm text-base-content/70 pb-3">
            Select and Save the categories and sources you want to see in your
            feed.
          </p>

          <div className="space-y-6">
            <PreferenceSection
              title="Categories"
              options={CATEGORIES.map((cat) => ({ id: cat, name: cat }))}
              selectedValues={selectedCategories}
              onToggle={handleCategoryToggle}
              variant="primary"
            />

            <PreferenceSection
              title="News Sources"
              options={SOURCES}
              selectedValues={selectedSources}
              onToggle={handleSourceToggle}
              variant="secondary"
            />
          </div>

          <div className="card-actions justify-between mt-4 pt-4 border-t border-base-200">
            <button
              className="btn btn-sm btn-ghost hover:bg-error/10 hover:text-error transition-colors"
              onClick={handleReset}
            >
              Reset All
            </button>
            <button
              className="btn btn-sm btn-primary hover:shadow-lg transition-all"
              onClick={handleSaveAndClose}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
