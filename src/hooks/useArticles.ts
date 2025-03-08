import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store.hook";
import {
  clearArticles,
  fetchArticles,
  setItemsFromCache,
} from "../slices/articlesSlice";
import { ARTICLES_PER_API_SOURCE } from "../constants";
import { ArticleRequest } from "../types/api.types";

export const useArticles = (newReq?: ArticleRequest) => {
  const dispatch = useAppDispatch();
  const [isInitialFetch, setIsInitialFetch] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [currentRequest, setCurrentRequest] = useState<
    ArticleRequest | undefined
  >(newReq);
  const { items, loading, error, cache, hasNextPage } = useAppSelector(
    (state) => state.articles,
  );
  const preferences = useAppSelector((state) => state.preferences);

  const combinedRequest = useMemo(
    () => ({
      ...currentRequest,
      preferences,
      page,
      pageSize: ARTICLES_PER_API_SOURCE,
    }),
    [currentRequest, preferences, page],
  );

  const preferencesKey = useMemo(
    () => JSON.stringify(preferences),
    [preferences.preferredCategories, preferences.preferredSources],
  );

  const loadMore = useCallback(() => {
    if (!loading && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasNextPage]);

  useEffect(() => {
    if (!newReq) return;

    const isNewSearch = !!newReq?.preferences || !!newReq?.keyword;
    if (isNewSearch) {
      dispatch(clearArticles());
      setCurrentRequest(newReq);
      setPage(1);
      setIsInitialFetch(true);
    }
  }, [dispatch, newReq]);

  useEffect(() => {
    dispatch(clearArticles());
    setPage(1);
    setIsInitialFetch(true);
  }, [dispatch, preferencesKey]);

  useEffect(() => {
    const cachedData = cache[JSON.stringify(combinedRequest)];

    const shouldFetch =
      page > 1 || (!cachedData && (isInitialFetch || items.length === 0));
    console.log("combinedRequest", [
      combinedRequest,
      shouldFetch,
      !cachedData,
      isInitialFetch,
      items,
    ]);
    if (shouldFetch) {
      dispatch(fetchArticles(combinedRequest));
    } else if (cachedData) {
      dispatch(setItemsFromCache(cachedData.articles));
    }

    setIsInitialFetch(false);
  }, [dispatch, combinedRequest, page, isInitialFetch]);

  return {
    items,
    loading,
    error,
    hasMore: hasNextPage,
    loadMore,
  };
};
