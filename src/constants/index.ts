export const API_KEYS = {
  NEWS_API: import.meta.env.VITE_NEWS_API_KEY,
  GUARDIAN_API: import.meta.env.VITE_GUARDIAN_API_KEY,
  NYT_API: import.meta.env.VITE_NYT_API_KEY,
};

export const API_ENDPOINTS = {
  NEWS_API: "https://newsapi.org/v2",
  GUARDIAN_API: "https://content.guardianapis.com",
  NYT_API: "https://api.nytimes.com/svc/search/v2",
};

export const CATEGORIES = [
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
  "Health",
  "Science",
  "Politics",
  "Environment",
  "World",
];

export const SOURCES = [
  { id: "nyt", name: "New York Times" },
  { id: "guardian", name: "The Guardian" },
  { id: "business-insider", name: "Business Insider" },
  { id: "bbc-news", name: "BBC News" },
  { id: "buzzfeed", name: "Buzzfeed" },
  { id: "politico", name: "Politico" },
  { id: "techcrunch", name: "TechCrunch" },
  { id: "talksport", name: "TalkSport" },
  { id: "cnn", name: "CNN" },
];

export const ARTICLES_PER_PAGE = 9; // 3x3 grid layout
export const CACHE_VALIDITY_DURATION = 10 * 60 * 1000; // 5 minutes
