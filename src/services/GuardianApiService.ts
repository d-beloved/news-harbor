import { API_ENDPOINTS, API_KEYS } from "../constants";
import { ArticleRequest, GuardianArticle } from "../types/api.types";
import { Article } from "../types/store.types";

export class GuardianAPIService {
  private static readonly CORS_PROXY = "https://corsproxy.io/?url=";

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

  static async fetchArticles(req: ArticleRequest): Promise<Article[]> {
    const pref = req.preferences;
    const params = new URLSearchParams({
      "api-key": API_KEYS.GUARDIAN_API,
      lang: "en",
      "show-fields": "thumbnail,body",
    });

    if (pref?.categories && pref.categories.length > 0) {
      params.append("section", pref.categories.join(",").toLowerCase());
    }

    if (req.keyword) {
      params.append("q", req.keyword);
    }

    if (req.page) {
      params.append("page", (req.page || 1).toString());
    }

    if (req.pageSize) {
      params.append("page-size", (req.pageSize || 10).toString());
    }

    try {
      const response = await fetch(
        `${this.CORS_PROXY}${API_ENDPOINTS.GUARDIAN_API}/search?${params.toString()}`,
        {
          headers: {
            Origin: "https://localhost:5173",
          },
        },
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
