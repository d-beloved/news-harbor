import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (req: ArticleRequest) => {
    const limit = ARTICLES_PER_PAGE;

    const articles = await ArticleService.fetchAllSources({
      ...req,
      pageSize: limit,
    });

    return {
      articles,
      page: req.page || 1,
      hasNextPage: articles.length === limit,
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
    },
    setItemsFromCache: (state, action) => {
      state.items = action.payload;
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

export const { clearArticles, setItemsFromCache } = articlesSlice.actions;
export default articlesSlice.reducer;
