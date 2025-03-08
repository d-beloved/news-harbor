import { Article, UserPreferences } from "./store.types";

export interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
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
    body?: string;
  };
  references?: { author?: string };
}

export interface NYTArticle {
  _id: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  abstract: string;
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
  preferences?: Omit<UserPreferences, "authors">;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export interface APIResponse {
  articles: Article[];
  hasMore: boolean;
}
