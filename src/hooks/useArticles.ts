import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store.hook";
import { clearArticles, fetchArticles } from "../slices/articlesSlice";
import { ArticleFilters } from "../types/api.types";
import { CacheItem } from "../types/store.types";
import { CACHE_VALIDITY_DURATION } from "../constants";

export const useArticles = (newFilters?: ArticleFilters) => {
  const dispatch = useAppDispatch();
  const [isInitialFetch, setIsInitialFetch] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { items, loading, error, filters, cache, hasNextPage } = useAppSelector(
    (state) => state.articles,
  );
  const preferences = useAppSelector((state) => state.preferences);

  const isCacheValid = (cacheItem: CacheItem) => {
    const now = Date.now();
    return now - cacheItem.timestamp < CACHE_VALIDITY_DURATION;
  };

  const loadMore = () => {
    if (!loading && hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (filters !== newFilters) {
      setPage(1);
      dispatch(clearArticles());
    }
  }, [filters, newFilters]);

  useEffect(() => {
    const combinedFilters = {
      ...newFilters,
      sources: preferences.sources,
      categories: preferences.categories,
      page,
    };

    const cacheKey = JSON.stringify(combinedFilters);
    const cachedData = cache[cacheKey];

    const shouldFetch =
      page > 1 ||
      !cachedData ||
      !isCacheValid(cachedData) ||
      (isInitialFetch && items.length === 0);

    if (shouldFetch) {
      dispatch(fetchArticles(combinedFilters));
    }

    setIsInitialFetch(false);
  }, [
    dispatch,
    preferences.sources,
    preferences.categories,
    JSON.stringify(newFilters),
    page,
  ]);

  return { items, loading, error, filters, hasMore: hasNextPage, loadMore };
};
