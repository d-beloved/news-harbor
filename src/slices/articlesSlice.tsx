import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesState } from "../types/store.types";
import { ArticleService } from "../services/ArticleService";
import { ARTICLES_PER_PAGE } from "../constants";
import { ArticleRequest } from "../types/api.types";

const initialState: ArticlesState = {
  items: [],
  cache: {},
  loading: false,
  error: null,
  hasNextPage: true,
  activeFilters: {},
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (req: ArticleRequest) => {
    const responses = await ArticleService.fetchAllSources({
      ...req,
      pageSize: ARTICLES_PER_PAGE,
    });

    const articles = responses.flatMap((response) => response.articles);
    const hasNextPage = responses.some((response) => response.hasMore);

    return {
      articles,
      page: req.page || 1,
      hasNextPage,
    };
  },
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.items = [];
      state.cache = {};
      state.hasNextPage = true;
      state.activeFilters = {};
    },
    setItemsFromCache: (state, action) => {
      state.items = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.activeFilters = state.activeFilters || {};
      state.activeFilters.category = action.payload;
    },
    setSourceFilter: (state, action: PayloadAction<string>) => {
      state.activeFilters.source = action.payload;
    },
    setDateFilter: (state, action: PayloadAction<"asc" | "desc" | undefined>) => {
      state.activeFilters.dateSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;

        // cache the results with the query parameters as key
        state.cache[JSON.stringify(action.meta.arg)] = {
          articles: action.payload.articles,
          timestamp: Date.now(),
          page: action.payload.page,
        };

        if (action.payload.page > 1) {
          state.items = [...state.items, ...action.payload.articles];
        } else {
          state.items = action.payload.articles;
        }

        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch articles";
      });
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
