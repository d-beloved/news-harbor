import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPreferences } from "../types/store.types";

const initialState: UserPreferences = {
  sources: [],
  categories: [],
  authors: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setSources: (state, action: PayloadAction<string[]>) => {
      state.sources = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setAuthors: (state, action: PayloadAction<string[]>) => {
      state.authors = action.payload;
    },
  },
});

export const { setSources, setCategories, setAuthors } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;
