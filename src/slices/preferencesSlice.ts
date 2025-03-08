import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPreferences } from "../types/store.types";

const initialState: UserPreferences = {
  preferredCategories: [],
  preferredSources: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    updatePreferences: (state, action: PayloadAction<UserPreferences>) => {
      state.preferredSources = action.payload.preferredSources;
      state.preferredCategories = action.payload.preferredCategories;
    },
    clearPreferences: (state) => {
      state.preferredSources = [];
      state.preferredCategories = [];
    },
  },
});

export const { updatePreferences, clearPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
