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
    bodyText?: string;
  };
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

export interface ArticleFilters {
  keyword?: string;
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  source?: string;
  page?: number;
  pageSize?: number;
}
