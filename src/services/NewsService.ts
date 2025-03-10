import { APIResponse, ArticleRequest } from "../types/api.types";
import { ApiServiceConfig, BaseApiService } from "./BaseApiService";
import { BaseResponseHandler } from "./BaseResponseHandler";

export abstract class NewsService<T, R> extends BaseApiService {
  constructor(
    config: ApiServiceConfig,
    protected responseHandler: BaseResponseHandler<T, R>,
  ) {
    super(config);
  }

  protected abstract buildRequestParams(req: ArticleRequest): URLSearchParams;
  protected abstract getEndpoint(): string;

  async fetchArticles(req: ArticleRequest): Promise<APIResponse> {
    try {
      const params = this.buildRequestParams(req);
      const response = await this.fetchWithTimeout<R>(
        this.buildUrl(this.getEndpoint(), params),
      );

      return this.responseHandler.formatResponse(response);
    } catch (error) {
      console.error(`${this.constructor.name} Error:`, error);
      throw error;
    }
  }
}
