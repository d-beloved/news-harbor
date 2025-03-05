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
  "World",
];

export const SOURCES = [
  { id: "nyt", name: "New York Times" },
  { id: "guardian", name: "The Guardian" },
  { id: "newsapi", name: "News API" },
];
