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
    toggleAuthor: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      const index = state.authors.indexOf(author);
      if (index === -1) {
        state.authors.push(author);
      } else {
        state.authors.splice(index, 1);
      }
    },
  },
});

export const { setSources, setCategories, setAuthors, toggleAuthor } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;
