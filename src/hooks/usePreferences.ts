import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store.hook";
import { updatePreferences } from "../store/slices/preferencesSlice";

export const usePreferences = () => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.preferences);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    preferences.preferredCategories || [],
  );
  const [selectedSources, setSelectedSources] = useState<string[]>(
    preferences.preferredSources || [],
  );

  useEffect(() => {
    setSelectedCategories(preferences.preferredCategories || []);
    setSelectedSources(preferences.preferredSources || []);
  }, [preferences]);

  const resetSelections = () => {
    setSelectedCategories(preferences.preferredCategories || []);
    setSelectedSources(preferences.preferredSources || []);
  };

  const handleSave = () => {
    dispatch(
      updatePreferences({
        preferredCategories: selectedCategories,
        preferredSources: selectedSources,
      }),
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedSources([]);
  };

  return {
    selectedCategories,
    selectedSources,
    setSelectedCategories,
    setSelectedSources,
    resetSelections,
    handleSave,
    handleReset,
  };
};
