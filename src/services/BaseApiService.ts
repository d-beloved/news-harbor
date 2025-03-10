import { APIResponse, ArticleRequest } from "../types/api.types";
import { HttpClient } from "./http/HttpClient";

export interface ApiServiceConfig {
  baseUrl: string;
  apiKey: string;
  timeout?: number;
  defaultParams?: Record<string, string>;
}

export abstract class BaseApiService {
  protected readonly httpClient: HttpClient;
  protected readonly defaultParams: URLSearchParams;

  constructor(protected config: ApiServiceConfig) {
    this.httpClient = new HttpClient({
      baseUrl: config.baseUrl,
      timeout: config.timeout,
      defaultHeaders: {},
    });

    this.defaultParams = new URLSearchParams({
      ...config.defaultParams,
    });
  }

  protected buildUrl(endpoint: string, params: URLSearchParams): string {
    return `${this.config.baseUrl}${endpoint}?${params.toString()}`;
  }

  protected createRequestParams(req: ArticleRequest): URLSearchParams {
    const params = new URLSearchParams(this.defaultParams);

    const paramMappings: Record<
      keyof Pick<ArticleRequest, "keyword" | "page" | "pageSize">,
      string
    > = {
      keyword: "q",
      page: "page",
      pageSize: "pageSize",
    };

    Object.entries(paramMappings).forEach(([key, paramName]) => {
      const value = req[key as keyof typeof paramMappings];
      if (value) {
        params.append(paramName, value.toString());
      }
    });

    return params;
  }

  protected async fetchWithTimeout<T>(
    url: string,
    options?: RequestInit,
  ): Promise<T> {
    return this.httpClient.fetch<T>(url, options);
  }

  abstract fetchArticles(req: ArticleRequest): Promise<APIResponse>;
}
