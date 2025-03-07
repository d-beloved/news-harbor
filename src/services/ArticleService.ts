import { GuardianAPIService } from "./GuardianApiService";
import { NewsApiService } from "./NewsApiService";
import { NYTimesService } from "./NytApiService";
import { SOURCES } from "../constants";
import { APIResponse, ArticleRequest } from "../types/api.types";

export class ArticleService {
  private static readonly TIMEOUT = 10000;

  private static timeoutPromise<T>(promise: Promise<T>): Promise<T> {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), this.TIMEOUT),
      ),
    ]) as Promise<T>;
  }

  static async fetchAllSources(req: ArticleRequest): Promise<APIResponse[]> {
    try {
      const sourcesToFetch = req.preferences?.sources?.length
        ? req.preferences.sources
        : SOURCES.map((source) => source.id);

      const apiCalls = [];

      // Get NewsAPI sources (excluding NYT and Guardian)
      const newsApiSources = sourcesToFetch.filter(
        (source) => source !== "nyt" && source !== "guardian",
      );

      if (newsApiSources.length > 0) {
        const modifiedReq = {
          ...req,
          preferences: {
            ...req.preferences,
            sources: newsApiSources,
          },
        };

        apiCalls.push(
          this.timeoutPromise(NewsApiService.fetchArticles(modifiedReq)),
        );
      }

      if (sourcesToFetch.includes("nyt")) {
        apiCalls.push(this.timeoutPromise(NYTimesService.fetchArticles(req)));
      }

      if (sourcesToFetch.includes("guardian")) {
        apiCalls.push(
          this.timeoutPromise(GuardianAPIService.fetchArticles(req)),
        );
      }

      const results = await Promise.allSettled(apiCalls);

      return results
        .filter(
          (result): result is PromiseFulfilledResult<APIResponse> =>
            result.status === "fulfilled",
        )
        .map((result) => result.value);
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw new Error("Failed to fetch articles from selected sources");
    }
  }
}
