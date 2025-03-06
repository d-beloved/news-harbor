import { API_ENDPOINTS, API_KEYS } from "../constants";
import { ArticleFilters, GuardianArticle } from "../types/api.types";
import { Article } from "../types/store.types";

export class GuardianAPIService {
  private static formatArticle(article: GuardianArticle): Article {
    return {
      id: `guardian-${article.id}`,
      title: article.webTitle,
      description: article.fields?.bodyText?.substring(0, 200) || "",
      content: article.fields?.bodyText || "",
      source: "The Guardian",
      publishedAt: article.webPublicationDate,
      url: article.webUrl,
      urlToImage: article.fields?.thumbnail,
      category: article.sectionName,
    };
  }

  static async fetchArticles(filters: ArticleFilters): Promise<Article[]> {
    const params = new URLSearchParams({
      "api-key": API_KEYS.GUARDIAN_API,
      q: filters.keyword || "",
      "from-date": filters.dateFrom || "",
      "to-date": filters.dateTo || "",
      section: filters.category || "",
      "page-size": (filters.pageSize || 20).toString(),
      page: (filters.page || 1).toString(),
      "show-fields": "thumbnail,bodyText",
      offset: (filters.offset || 0).toString(),
    });

    try {
      const response = await fetch(
        `${API_ENDPOINTS.GUARDIAN_API}/search?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Guardian API request failed");
      }

      const data = await response.json();
      return data.response.results.map(this.formatArticle);
    } catch (error) {
      console.error("Guardian API Error:", error);
      throw error;
    }
  }
}
