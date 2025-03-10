import { useMemo } from "react";
import { Article, ArticleFilters } from "../types/store.types";

export const useFilteredArticles = (
  items: Article[],
  activeFilters: ArticleFilters,
) => {
  return useMemo(() => {
    let filtered = [...items];

    const { category, source, dateSort } = activeFilters;

    if (category || source) {
      filtered = filtered.filter((article) => {
        const matchesCategory =
          !category ||
          article.category?.toLowerCase() === category.toLowerCase();
        const matchesSource =
          !source ||
          article.source.toLowerCase().replace(/\s+/g, "-") === source;
        return matchesCategory && matchesSource;
      });
    }

    if (dateSort) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateSort === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return filtered;
  }, [items, activeFilters]);
};
