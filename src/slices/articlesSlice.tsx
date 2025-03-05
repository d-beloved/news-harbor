import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ArticlesState } from "../types/store.types";
import { ArticleService } from "../services/ArticleService";
import { ArticleFilters } from "../types/api.types";

const initialState: ArticlesState = {
  items: [],
  cache: {},
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (filters: ArticleFilters) => {
    const articles = await ArticleService.fetchAllSources(filters);
    return articles;
  },
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        // We cache the results here with the query parameters as key
        state.cache[JSON.stringify(action.meta.arg)] = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch articles";
      });
  },
});

export const { clearArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
