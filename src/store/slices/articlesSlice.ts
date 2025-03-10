import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesState } from "../../types/store.types";
import { fetchArticles } from "../thunks/articleThunks";
import {
  articleReducers,
  extraArticleReducers,
} from "../reducers/articleReducers";

export const initialState: ArticlesState = {
  items: [],
  cache: {},
  loading: false,
  error: null,
  hasNextPage: true,
  activeFilters: {},
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticles: articleReducers.clearArticles,
    setItemsFromCache: articleReducers.setItemsFromCache,
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      articleReducers.setFilter(state, "category", action.payload);
    },
    setSourceFilter: (state, action: PayloadAction<string>) => {
      articleReducers.setFilter(state, "source", action.payload);
    },
    setDateFilter: (state, action: PayloadAction<string>) => {
      articleReducers.setFilter(state, "dateSort", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, extraArticleReducers.pending)
      .addCase(fetchArticles.fulfilled, extraArticleReducers.fulfilled)
      .addCase(fetchArticles.rejected, extraArticleReducers.rejected);
  },
});

export const {
  clearArticles,
  setItemsFromCache,
  setCategoryFilter,
  setSourceFilter,
  setDateFilter,
} = articlesSlice.actions;

export default articlesSlice.reducer;
