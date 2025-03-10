import { APIResponse, ArticleFormatter } from "../types/api.types";

export abstract class BaseResponseHandler<T, R> {
  constructor(protected formatter: ArticleFormatter<T>) {}

  abstract hasMorePages(response: R): boolean;
  abstract getArticles(response: R): T[];

  formatResponse(response: R): APIResponse {
    return {
      articles: this.getArticles(response).map((article) =>
        this.formatter.format(article),
      ),
      hasMore: this.hasMorePages(response),
    };
  }
}
