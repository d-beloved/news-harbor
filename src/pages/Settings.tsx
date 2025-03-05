import React from "react";
import { PreferencesForm } from "../components/settings/PreferencesForm";
import { useAppSelector } from "../hooks/store.hook";

const Settings: React.FC = () => {
  const { sources, categories } = useAppSelector((state) => state.preferences);

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">
          Customize your news feed by selecting your preferred sources and
          categories.
          {sources.length === 0 &&
            categories.length === 0 &&
            " You currently have no preferences set."}
        </p>
      </header>

      <div className="divider"></div>

      <PreferencesForm />

      <div className="mt-8 p-4 bg-base-200 rounded-lg">
        <h3 className="font-semibold mb-2">About Your Preferences</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
          <li>Selected sources: {sources.length}</li>
          <li>Selected categories: {categories.length}</li>
          <li>
            Your preferences are automatically saved and will persist across
            sessions
          </li>
          <li>You can change these settings at any time</li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
