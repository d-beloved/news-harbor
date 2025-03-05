import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { Filters } from "../components/filters";
import { fetchArticles } from "../slices/articlesSlice";
import { ArticleList } from "../components/article/ArticleList";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { preferences } = useAppSelector((state) => state);

  useEffect(() => {
    const { sources, categories } = preferences;
    if (sources.length || categories.length) {
      dispatch(
        fetchArticles({
          source: sources.join(','),
          category: categories.join(','),
        }),
      );
    } else {
      dispatch(fetchArticles({}));
    }
  }, [dispatch, preferences.sources, preferences.categories]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Latest News</h1>

      <Filters />

      <ArticleList />
    </div>
  );
};

export default Home;
