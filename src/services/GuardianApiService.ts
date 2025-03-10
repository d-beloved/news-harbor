import { API_ENDPOINTS, API_KEYS } from "../constants";
import {
  ArticleRequest,
  GuardianArticle,
  GuardianResponse,
} from "../types/api.types";
import { GuardianFormatter } from "./ArticleFormatters";
import { BaseResponseHandler } from "./BaseResponseHandler";
import { NewsService } from "./NewsService";

export class GuardianResponseHandler extends BaseResponseHandler<
  GuardianArticle,
  GuardianResponse
> {
  hasMorePages(response: GuardianResponse): boolean {
    return response.response.pages > response.response.currentPage;
  }

  getArticles(response: GuardianResponse): GuardianArticle[] {
    return response.response.results;
  }
}

export class GuardianAPIService extends NewsService<
  GuardianArticle,
  GuardianResponse
> {
  private static readonly CORS_PROXY = "https://corsproxy.io/?url=";

  constructor() {
    super(
      {
        baseUrl: `${GuardianAPIService.CORS_PROXY}${API_ENDPOINTS.GUARDIAN_API}`,
        apiKey: API_KEYS.GUARDIAN_API,
        defaultParams: {
          "api-key": API_KEYS.GUARDIAN_API,
          lang: "en",
          "show-fields": "thumbnail,byline",
          "show-tags": "contributor",
        },
      },
      new GuardianResponseHandler(new GuardianFormatter()),
    );
  }

  protected getEndpoint(): string {
    return "/search";
  }

  protected buildRequestParams(req: ArticleRequest): URLSearchParams {
    const params = this.createRequestParams(req);

    if (req.preferences?.preferredCategories?.length) {
      params.append(
        "section",
        req.preferences.preferredCategories.join(",").toLowerCase(),
      );
    }

    return params;
  }
}
