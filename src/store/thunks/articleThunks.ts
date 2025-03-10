import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleRequest } from "../../types/api.types";
import { articleService } from "../../services/serviceConfig";
import { ARTICLES_PER_API_SOURCE } from "../../constants";
import { sortArticles } from "../../utils/articleUtils";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (req: ArticleRequest, { rejectWithValue }) => {
    try {
      const responses = await articleService.fetchAllSources({
        ...req,
        pageSize: ARTICLES_PER_API_SOURCE,
      });

      return {
        articles: sortArticles(
          responses.flatMap((response) => response.articles),
        ),
        page: req.page || 1,
        hasNextPage: responses.some((response) => response.hasMore),
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch articles",
      );
    }
  },
);
