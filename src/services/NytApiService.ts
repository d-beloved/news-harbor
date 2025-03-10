import { API_ENDPOINTS, API_KEYS } from "../constants";
import { ArticleRequest, NYTArticle, NYTResponse } from "../types/api.types";
import { NYTFormatter } from "./ArticleFormatters";
import { BaseResponseHandler } from "./BaseResponseHandler";
import { NewsService } from "./NewsService";

export class NYTResponseHandler extends BaseResponseHandler<
  NYTArticle,
  NYTResponse
> {
  hasMorePages(response: NYTResponse): boolean {
    return response.response.meta.hits > response.response.docs.length;
  }

  getArticles(response: NYTResponse): NYTArticle[] {
    return response.response.docs;
  }
}

export class NYTimesService extends NewsService<NYTArticle, NYTResponse> {
  constructor() {
    super(
      {
        baseUrl: API_ENDPOINTS.NYT_API,
        apiKey: API_KEYS.NYT_API,
        defaultParams: {
          "api-key": API_KEYS.NYT_API,
        },
      },
      new NYTResponseHandler(new NYTFormatter()),
    );
  }

  protected getEndpoint(): string {
    return "/articlesearch.json";
  }

  protected buildRequestParams(req: ArticleRequest): URLSearchParams {
    const params = this.createRequestParams(req);

    if (req.preferences?.preferredCategories?.length) {
      params.append(
        "fq",
        `section_name:(${req.preferences.preferredCategories
          .map((cat) => `"${cat.toLowerCase()}"`)
          .join(" OR ")})`,
      );
    }

    return params;
  }
}
