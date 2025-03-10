import { Article, UserPreferences } from "./store.types";

export interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields?: {
    thumbnail?: string;
    byline?: string;
  };
  tags?: Array<{
    type: string;
    webTitle: string;
  }>;
}

export interface NYTArticle {
  _id: string;
  web_url: string;
  source: string;
  headline: {
    main: string;
  };
  multimedia: Array<{
    url: string;
    type: string;
  }>;
  pub_date: string;
  byline: {
    original: string;
  };
  section_name: string;
}

export interface ArticleRequest {
  preferences?: UserPreferences;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export interface APIResponse {
  articles: Article[];
  hasMore: boolean;
}

export interface GuardianResponse {
  response: {
    results: GuardianArticle[];
    pages: number;
    currentPage: number;
  };
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

export interface NYTResponse {
  status: string;
  response: {
    docs: NYTArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface ArticleFormatter<T> {
  format(article: T): Article;
  getAuthor(article: T): string;
  getImage(article: T): string | undefined;
}
