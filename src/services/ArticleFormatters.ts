import {
  ArticleFormatter,
  GuardianArticle,
  NewsApiArticle,
  NYTArticle,
} from "../types/api.types";
import { Article } from "../types/store.types";

export class GuardianFormatter implements ArticleFormatter<GuardianArticle> {
  format(article: GuardianArticle): Article {
    return {
      id: `guardian-${article.id}`,
      title: article.webTitle,
      source: "The Guardian",
      publishedAt: article.webPublicationDate,
      url: article.webUrl,
      urlToImage: this.getImage(article),
      category: article.sectionName,
      author: this.getAuthor(article),
    };
  }

  getAuthor(article: GuardianArticle): string {
    return (
      article.tags?.find((tag) => tag.type === "contributor")?.webTitle ||
      "The Guardian"
    );
  }

  getImage(article: GuardianArticle): string | undefined {
    return article.fields?.thumbnail;
  }
}

export class NewsApiFormatter implements ArticleFormatter<NewsApiArticle> {
  format(article: NewsApiArticle): Article {
    return {
      id: `newsapi-${article.url}`,
      title: article.title,
      source: article.source.name,
      publishedAt: article.publishedAt,
      url: article.url,
      urlToImage: this.getImage(article),
      author: this.getAuthor(article),
    };
  }

  getAuthor(article: NewsApiArticle): string {
    return article.author || article.source.name;
  }

  getImage(article: NewsApiArticle): string | undefined {
    return article.urlToImage;
  }
}

export class NYTFormatter implements ArticleFormatter<NYTArticle> {
  private static readonly IMAGE_BASE_URL = "https://static01.nyt.com/";

  format(article: NYTArticle): Article {
    return {
      id: `nyt-${article._id}`,
      title: article.headline.main,
      source: "New York Times",
      publishedAt: article.pub_date,
      url: article.web_url,
      urlToImage: this.getImage(article),
      category: article.section_name,
      author: this.getAuthor(article),
    };
  }

  getAuthor(article: NYTArticle): string {
    return article.byline?.original || "New York Times";
  }

  getImage(article: NYTArticle): string | undefined {
    const image = article.multimedia?.find((media) => media.type === "image");
    return image ? `${NYTFormatter.IMAGE_BASE_URL}${image.url}` : undefined;
  }
}
