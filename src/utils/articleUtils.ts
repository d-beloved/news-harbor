import { ArticleRequest } from "../types/api.types";
import { Article } from "../types/store.types";

export const sortArticles = (articles: Article[]): Article[] => {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
};

export const createCacheKey = (request: ArticleRequest): string =>
  JSON.stringify(request);
