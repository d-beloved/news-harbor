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
  sources: string[];
  categories: string[];
  authors: string[];
}

export interface SearchFilters {
  keyword: string;
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  source?: string;
}

export interface ArticlesState {
  items: Article[];
  cache: Record<string, Article[]>;
  loading: boolean;
  error: string | null;
  filters?: {
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    source?: string;
  };
}
