import { ArticleFilters } from "../types/api.types";
import { Article } from "../types/store.types";
import { GuardianAPIService } from "./guardianApiService";
import { NewsApiService } from "./newsApiService";
import { NYTimesService } from "./nytApiService";

export class ArticleService {
  static async fetchAllSources(filters: ArticleFilters): Promise<Article[]> {
    try {
      const [newsApiArticles, guardianArticles, nytArticles] =
        await Promise.all([
          NewsApiService.fetchArticles(filters),
          GuardianAPIService.fetchArticles(filters),
          NYTimesService.fetchArticles(filters),
        ]);

      return [...newsApiArticles, ...guardianArticles, ...nytArticles].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  }
}
