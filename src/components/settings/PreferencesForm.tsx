import React from "react";
import { useNavigate } from "react-router";
import { SourceSelector } from "./SourceSelector";
import { CategorySelector } from "./CategorySelector";
import { useAppSelector } from "../../hooks/store.hook";
import { AuthorSelector } from "./AuthorSelector";

export const PreferencesForm: React.FC = () => {
  const navigate = useNavigate();
  const { sources, categories } = useAppSelector((state) => state.preferences);

  const handleSave = () => {
    // Preferences is automatically saved through Redux
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6">Personalize Your News Feed</h2>

          <div className="space-y-8">
            <SourceSelector />
            <div className="divider"></div>
            <CategorySelector />
            <div className="divider"></div>
            <AuthorSelector />
          </div>

          <div className="card-actions justify-end mt-6">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={sources.length === 0 || categories.length === 0}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
