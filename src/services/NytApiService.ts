import { API_ENDPOINTS, API_KEYS } from "../constants";
import { APIResponse, ArticleRequest, NYTArticle } from "../types/api.types";
import { Article } from "../types/store.types";

export class NYTimesService {
  private static formatArticle(article: NYTArticle): Article {
    const multimedia = article.multimedia.find(
      (media) => media.type === "image",
    );

    return {
      id: `nyt-${article._id}`,
      title: article.headline.main,
      description: article.abstract || article.snippet,
      content: article.lead_paragraph,
      source: "New York Times",
      author: article.byline.original,
      publishedAt: article.pub_date,
      url: article.web_url,
      urlToImage: multimedia
        ? `https://www.nytimes.com/${multimedia.url}`
        : undefined,
      category: article.section_name,
    };
  }

  static async fetchArticles(req: ArticleRequest): Promise<APIResponse> {
    const pref = req.preferences;
    const params = new URLSearchParams({ "api-key": API_KEYS.NYT_API });

    if (req.keyword) {
      params.append("q", req.keyword);
    }

    if (req.page) {
      params.append("page", (req.page || 1).toString());
    }

    if (pref?.preferredCategories && pref.preferredCategories.length > 0) {
      params.append(
        "fq",
        `section_name:${pref?.preferredCategories.join(",").toLowerCase()}`,
      );
    }

    try {
      const response = await fetch(
        `${API_ENDPOINTS.NYT_API}/articlesearch.json?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("NYTimes API request failed");
      }

      const data = await response.json();
      const articles = data.response.docs.map(this.formatArticle);
      return {
        articles,
        hasMore: data.response.meta.hits > data.response.docs.length,
      };
    } catch (error) {
      console.error("NYTimes API Error:", error);
      throw error;
    }
  }
}
