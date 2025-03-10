import { PayloadAction } from "@reduxjs/toolkit";
import { ArticlesState, Article, FilterType } from "../../types/store.types";
import { initialState } from "../slices/articlesSlice";
import { createCacheKey } from "../../utils/articleUtils";

export const articleReducers = {
  clearArticles: (state: ArticlesState) => {
    Object.assign(state, initialState);
  },
  setItemsFromCache: (
    state: ArticlesState,
    action: PayloadAction<Article[]>,
  ) => {
    state.items = action.payload;
  },
  setFilter: (state: ArticlesState, type: FilterType, value: any) => {
    state.activeFilters = {
      ...state.activeFilters,
      [type]: value,
    };
  },
};

export const extraArticleReducers = {
  pending: (state: ArticlesState) => {
    state.loading = true;
    state.error = null;
  },
  fulfilled: (state: ArticlesState, action: any) => {
    const { articles, page, hasNextPage } = action.payload;
    const cacheKey = createCacheKey(action.meta.arg);

    state.cache[cacheKey] = {
      articles,
      timestamp: Date.now(),
      page,
    };

    state.items = page > 1 ? [...state.items, ...articles] : articles;
    state.hasNextPage = hasNextPage;
    state.loading = false;
  },
  rejected: (state: ArticlesState, action: any) => {
    state.loading = false;
    state.error = (action.payload as string) || "Failed to fetch articles";
  },
};
