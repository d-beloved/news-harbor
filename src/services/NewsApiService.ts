import { API_ENDPOINTS, API_KEYS } from "../constants";
import {
  ArticleRequest,
  NewsApiArticle,
  NewsAPIResponse,
} from "../types/api.types";
import { NewsApiFormatter } from "./ArticleFormatters";
import { BaseResponseHandler } from "./BaseResponseHandler";
import { NewsService } from "./NewsService";

export class NewsApiResponseHandler extends BaseResponseHandler<
  NewsApiArticle,
  NewsAPIResponse
> {
  hasMorePages(response: NewsAPIResponse): boolean {
    return response.totalResults > response.articles.length;
  }

  getArticles(response: NewsAPIResponse): NewsApiArticle[] {
    return response.articles;
  }
}

export class NewsApiService extends NewsService<
  NewsApiArticle,
  NewsAPIResponse
> {
  constructor() {
    super(
      {
        baseUrl: API_ENDPOINTS.NEWS_API,
        apiKey: API_KEYS.NEWS_API,
        defaultParams: {
          apiKey: API_KEYS.NEWS_API,
          language: "en",
        },
      },
      new NewsApiResponseHandler(new NewsApiFormatter()),
    );
  }

  protected getEndpoint(): string {
    return "/everything";
  }

  protected buildRequestParams(req: ArticleRequest): URLSearchParams {
    const params = this.createRequestParams(req);
    let queryParts: string[] = [];

    if (req.keyword) {
      queryParts.push(req.keyword);
    }

    if (req.preferences?.preferredCategories?.length) {
      queryParts.push(req.preferences.preferredCategories.join(" OR "));
    }

    if (queryParts.length > 0) {
      params.set("q", queryParts.join(" "));
    }

    if (req.preferences?.preferredSources?.length) {
      params.append("sources", req.preferences.preferredSources.join(","));
    }

    return params;
  }
}
