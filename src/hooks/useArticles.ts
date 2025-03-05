import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store.hook";
import { fetchArticles } from "../slices/articlesSlice";
import { ArticleFilters } from "../types/api.types";

export const useArticles = (newFilters?: ArticleFilters) => {
  const dispatch = useAppDispatch();
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const { items, loading, error, filters } = useAppSelector(
    (state) => state.articles,
  );
  const preferences = useAppSelector((state) => state.preferences);

  useEffect(() => {
    if (isInitialFetch || filters !== newFilters) {
      const combinedFilters = {
        ...newFilters,
        sources: preferences.sources,
        categories: preferences.categories,
      };
      dispatch(fetchArticles(combinedFilters));
      setIsInitialFetch(false);
    }
  }, [
    dispatch,
    preferences.sources,
    preferences.categories,
    JSON.stringify(newFilters),
  ]);

  return { items, loading, error, filters };
};
