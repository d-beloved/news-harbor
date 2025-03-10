export interface Article {
  id: string;
  title: string;
  source: string;
  author?: string;
  publishedAt: string;
  url: string;
  urlToImage?: string;
  category?: string;
}

export interface UserPreferences {
  preferredSources?: string[];
  preferredCategories?: string[];
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

export type PreferencesState = UserPreferences;

export type PreferenceUpdatePayload = Partial<UserPreferences>;

export type FilterType = keyof ArticlesState["activeFilters"];

export interface FilterPayload {
  type: FilterType;
  value: any;
}
