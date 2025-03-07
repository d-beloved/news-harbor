import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store.hook";
import { clearArticles, fetchArticles } from "../slices/articlesSlice";
import { CacheItem } from "../types/store.types";
import { ARTICLES_PER_PAGE, CACHE_VALIDITY_DURATION } from "../constants";
import { ArticleRequest } from "../types/api.types";

export const useArticles = (newReq?: ArticleRequest) => {
  const dispatch = useAppDispatch();
  const [isInitialFetch, setIsInitialFetch] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { items, loading, error, cache, hasNextPage } = useAppSelector(
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
    if (preferences !== newReq?.preferences || newReq?.keyword) {
      setPage(1);
      dispatch(clearArticles());
    }
  }, [preferences, newReq?.keyword, JSON.stringify(newReq?.preferences)]);

  useEffect(() => {
    const combinedRequest = {
      ...newReq,
      preferences,
      page,
      pageSize: ARTICLES_PER_PAGE,
    };

    const cacheKey = JSON.stringify(combinedRequest);
    const cachedData = cache[cacheKey];

    const shouldFetch =
      page > 1 ||
      !cachedData ||
      !isCacheValid(cachedData) ||
      (isInitialFetch && items.length === 0);

    if (shouldFetch) {
      dispatch(fetchArticles(combinedRequest));
    }

    setIsInitialFetch(false);
  }, [dispatch, JSON.stringify(preferences), JSON.stringify(newReq), page]);

  return { items, loading, error, hasMore: hasNextPage, loadMore };
};
