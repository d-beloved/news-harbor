import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store.hook";
import {
  clearArticles,
  setItemsFromCache,
} from "../store/slices/articlesSlice";
import { ARTICLES_PER_API_SOURCE } from "../constants";
import { ArticleRequest } from "../types/api.types";
import { fetchArticles } from "../store/thunks/articleThunks";

export const useArticles = (newSearchTerm?: string) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const isInitialFetch = useRef<boolean>(true);
  const searchTermRef = useRef(newSearchTerm);

  const { items, loading, error, cache, hasNextPage } = useAppSelector(
    (state) => state.articles,
  );
  const preferences = useAppSelector((state) => state.preferences);
  const preferencesRef = useRef(preferences);
  const fetchingRef = useRef(false);

  const combinedRequest = useMemo(
    () =>
      ({
        preferences,
        keyword: searchTermRef.current,
        page,
        pageSize: ARTICLES_PER_API_SOURCE,
      }) as ArticleRequest,
    [preferences, page, searchTermRef.current],
  );

  const cacheKey = useMemo(
    () => JSON.stringify(combinedRequest),
    [combinedRequest],
  );

  const loadMore = useCallback(() => {
    if (!loading && hasNextPage && !fetchingRef.current) {
      setPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  useEffect(() => {
    let needsReset = false;

    if (fetchingRef.current) return;

    if (
      JSON.stringify(preferencesRef.current) !== JSON.stringify(preferences)
    ) {
      preferencesRef.current = preferences;
      needsReset = true;
    }

    if (newSearchTerm !== searchTermRef.current) {
      searchTermRef.current = newSearchTerm;
      needsReset = true;
    }

    if (needsReset) {
      dispatch(clearArticles());
      setPage(1);
      return;
    }

    const cachedData = cache[cacheKey];
    const shouldFetch =
      page > 1 ||
      (!cachedData && (isInitialFetch.current || items.length === 0));

    if (shouldFetch) {
      fetchingRef.current = true;
      dispatch(fetchArticles(combinedRequest)).finally(() => {
        fetchingRef.current = false;
      });
    } else if (cachedData && isInitialFetch.current) {
      dispatch(setItemsFromCache(cachedData.articles));
    }

    isInitialFetch.current = false;
  }, [
    dispatch,
    preferences,
    newSearchTerm,
    cacheKey,
    page,
    items.length,
    cache,
  ]);

  return {
    items,
    loading,
    error,
    hasMore: hasNextPage,
    loadMore,
  };
};
