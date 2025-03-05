import { API_ENDPOINTS, API_KEYS } from "../constants";
import { ArticleFilters, NYTArticle } from "../types/api.types";
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
      source: "The New York Times",
      author: article.byline.original,
      publishedAt: article.pub_date,
      url: article.web_url,
      urlToImage: multimedia
        ? `https://www.nytimes.com/${multimedia.url}`
        : undefined,
      category: article.section_name,
    };
  }

  static async fetchArticles(filters: ArticleFilters): Promise<Article[]> {
    const params = new URLSearchParams({
      "api-key": API_KEYS.NYT_API,
      q: filters.keyword || "",
      page: ((filters.page || 1) - 1).toString(),
    });

    if (filters.dateFrom) {
      params.append("begin_date", filters.dateFrom.replace(/-/g, ""));
    }

    if (filters.dateTo) {
      params.append("end_date", filters.dateTo.replace(/-/g, ""));
    }

    if (filters.category) {
      params.append("fq", `section_name:${filters.category}`);
    }

    try {
      const response = await fetch(
        `${API_ENDPOINTS.NYT_API}/articlesearch.json?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("NYTimes API request failed");
      }

      const data = await response.json();
      return data.response.docs.map(this.formatArticle);
    } catch (error) {
      console.error("NYTimes API Error:", error);
      throw error;
    }
  }
}
