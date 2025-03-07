import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store.hook";
import {
  clearArticles,
  fetchArticles,
  setItemsFromCache,
} from "../slices/articlesSlice";
import { ARTICLES_PER_PAGE } from "../constants";
import { ArticleRequest } from "../types/api.types";

export const useArticles = (newReq?: ArticleRequest) => {
  const dispatch = useAppDispatch();
  const [isInitialFetch, setIsInitialFetch] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { items, loading, error, cache, hasNextPage } = useAppSelector(
    (state) => state.articles,
  );
  const preferences = useAppSelector((state) => state.preferences);

  const loadMore = () => {
    if (!loading && hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (!!newReq?.preferences || !!newReq?.keyword) {
      setPage(1);
      dispatch(clearArticles());
    }
  }, [newReq?.keyword, JSON.stringify(newReq?.preferences)]);

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
      page > 1 || (!cachedData && (isInitialFetch || items.length === 0));

    if (shouldFetch) {
      dispatch(fetchArticles(combinedRequest));
    } else if (cachedData) {
      dispatch(setItemsFromCache(cachedData.articles));
    }

    setIsInitialFetch(false);
  }, [dispatch, JSON.stringify(preferences), JSON.stringify(newReq), page]);

  return {
    items,
    loading,
    error,
    hasMore: hasNextPage,
    loadMore,
  };
};
