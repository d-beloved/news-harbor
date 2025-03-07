import { API_ENDPOINTS, API_KEYS } from "../constants";
import {
  APIResponse,
  ArticleRequest,
  GuardianArticle,
} from "../types/api.types";
import { Article } from "../types/store.types";

export class GuardianAPIService {
  private static readonly CORS_PROXY = "https://corsproxy.io/?url=";

  private static formatArticle(article: GuardianArticle): Article {
    return {
      id: `guardian-${article.id}`,
      title: article.webTitle,
      description: article.fields?.body?.substring(0, 200) || "",
      content: article.fields?.body || "",
      source: "The Guardian",
      publishedAt: article.webPublicationDate,
      url: article.webUrl,
      urlToImage: article.fields?.thumbnail,
      category: article.sectionName,
      author: article.references?.author || "",
    };
  }

  static async fetchArticles(req: ArticleRequest): Promise<APIResponse> {
    const pref = req.preferences;
    const params = new URLSearchParams({
      "api-key": API_KEYS.GUARDIAN_API,
      lang: "en",
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

    params.append("show-fields", "thumbnail");
    params.append("show-references", "author");

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
      const articles = data.response.results.map(this.formatArticle);
      return {
        articles,
        hasMore: data.response.pages > data.response.currentPage,
      };
    } catch (error) {
      console.error("Guardian API Error:", error);
      throw error;
    }
  }
}
