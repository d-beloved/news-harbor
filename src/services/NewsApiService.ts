import { API_ENDPOINTS, API_KEYS } from "../constants";
import { ArticleFilters, NewsApiArticle } from "../types/api.types";
import { Article } from "../types/store.types";

export class NewsApiService {
  private static formatArticle(article: NewsApiArticle): Article {
    return {
      id: `newsapi-${article.url}`,
      title: article.title,
      description: article.description,
      content: article.content,
      source: article.source.name,
      author: article.author,
      publishedAt: article.publishedAt,
      url: article.url,
      urlToImage: article.urlToImage,
    };
  }

  static async fetchArticles(filters: ArticleFilters): Promise<Article[]> {
    const params = new URLSearchParams({
      apiKey: API_KEYS.NEWS_API,
      q: filters.keyword || "",
      from: filters.dateFrom || "",
      to: filters.dateTo || "",
      category: filters.category || "",
      pageSize: (filters.pageSize || 20).toString(),
      page: (filters.page || 1).toString(),
      offset: (filters.offset || 0).toString(),
    });

    try {
      const response = await fetch(
        `${API_ENDPOINTS.NEWS_API}/everything?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("NewsAPI request failed");
      }

      const data = await response.json();
      return data.articles.map(this.formatArticle);
    } catch (error) {
      console.error("NewsAPI Error:", error);
      throw error;
    }
  }
}
