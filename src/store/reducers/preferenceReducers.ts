import { PayloadAction } from "@reduxjs/toolkit";
import {
  PreferencesState,
  PreferenceUpdatePayload,
} from "../../types/store.types";

export const preferenceReducers = {
  updatePreferences: (
    state: PreferencesState,
    action: PayloadAction<PreferenceUpdatePayload>,
  ) => {
    if (action.payload.preferredSources !== undefined) {
      state.preferredSources = action.payload.preferredSources;
    }
    if (action.payload.preferredCategories !== undefined) {
      state.preferredCategories = action.payload.preferredCategories;
    }
  },

  clearPreferences: (state: PreferencesState) => {
    state.preferredSources = [];
    state.preferredCategories = [];
  },
};
