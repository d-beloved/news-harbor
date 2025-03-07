export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  source: string;
  author?: string;
  publishedAt: string;
  url: string;
  urlToImage?: string;
  category?: string;
}

export interface UserPreferences {
  sources?: string[];
  categories?: string[];
  authors?: string[];
}

export interface CacheItem {
  articles: Article[];
  timestamp: number;
  page: number;
}

export interface ArticlesState {
  items: Article[];
  cache: Record<string, CacheItem>;
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  activeFilters: ArticleFilters;
}

export interface ArticleFilters {
  source?: string;
  category?: string;
  dateSort?: "asc" | "desc";
}
