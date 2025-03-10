import { createSlice } from "@reduxjs/toolkit";
import { PreferencesState } from "../../types/store.types";
import { preferenceReducers } from "../reducers/preferenceReducers";

export const initialState: PreferencesState = {
  preferredCategories: [],
  preferredSources: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: preferenceReducers,
});

export const { updatePreferences, clearPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
