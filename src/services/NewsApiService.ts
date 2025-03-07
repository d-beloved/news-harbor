import { API_ENDPOINTS, API_KEYS } from "../constants";
import { ArticleRequest, NewsApiArticle } from "../types/api.types";
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

  static async fetchArticles(req: ArticleRequest): Promise<Article[]> {
    const pref = req.preferences;
    const params = new URLSearchParams({
      apiKey: API_KEYS.NEWS_API,
      language: "en",
    });

    if (req.keyword) {
      params.append("q", req.keyword);
    }

    if (req.page) {
      params.append("page", (req.page || 1).toString());
    }

    if (req.pageSize) {
      params.append("pageSize", (req.pageSize || 10).toString());
    }

    if (pref?.categories && pref.categories.length > 0) {
      params.append("category", pref.categories.join(",").toLowerCase());
    }

    if (pref?.sources && pref.sources.length > 0) {
      params.append("sources", pref.sources.join(","));
    }

    try {
      const response = await fetch(
        `${API_ENDPOINTS.NEWS_API}/top-headlines?${params.toString()}`,
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
