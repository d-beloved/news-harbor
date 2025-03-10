import { SOURCES } from "../constants";
import { APIResponse, ArticleRequest } from "../types/api.types";
import { BaseApiService } from "./BaseApiService";

type ServiceType = "guardian" | "nyt" | "newsapi";

export interface ArticleServiceConfig {
  services: Record<ServiceType, BaseApiService>;
}

export class ArticleService {
  private services: Record<ServiceType, BaseApiService>;
  private readonly SPECIFIC_SERVICES: ServiceType[] = ["guardian", "nyt"];

  constructor(config: ArticleServiceConfig) {
    this.services = config.services;
  }

  private getSourcesByType(sources: string[]): Record<ServiceType, string[]> {
    return {
      guardian: sources.filter((id) => id === "guardian"),
      nyt: sources.filter((id) => id === "nyt"),
      newsapi: sources.filter(
        (id) => !this.SPECIFIC_SERVICES.includes(id as ServiceType),
      ),
    };
  }

  private async fetchFromService(
    serviceType: ServiceType,
    sources: string[],
    request: ArticleRequest,
  ): Promise<APIResponse | null> {
    if (sources.length === 0 || !this.services[serviceType]) {
      return null;
    }

    const serviceRequest =
      serviceType === "newsapi"
        ? {
            ...request,
            preferences: {
              ...request.preferences,
              preferredSources: sources,
            },
          }
        : request;

    return this.services[serviceType].fetchArticles(serviceRequest);
  }

  async fetchAllSources(req: ArticleRequest): Promise<APIResponse[]> {
    try {
      const sourcesToFetch = req.preferences?.preferredSources?.length
        ? req.preferences.preferredSources
        : SOURCES.map((source) => source.id);

      const sourcesByType = this.getSourcesByType(sourcesToFetch);

      const results = await Promise.allSettled(
        Object.entries(sourcesByType).map(([type, sources]) =>
          this.fetchFromService(type as ServiceType, sources, req),
        ),
      );

      return results
        .filter(
          (result): result is PromiseFulfilledResult<APIResponse> =>
            result.status === "fulfilled" && result.value !== null,
        )
        .map((result) => result.value);
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw new Error("Failed to fetch articles from selected sources");
    }
  }
}
