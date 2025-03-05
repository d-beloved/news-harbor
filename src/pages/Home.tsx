import React from "react";
import { Filters } from "../components/filters";
import { ArticleList } from "../components/article/ArticleList";
import { useArticles } from "../hooks/useArticles";

const Home: React.FC = () => {
  const { items, loading, error } = useArticles();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Latest News</h1>
      <Filters />
      <ArticleList items={items} loading={loading} error={error} />
    </div>
  );
};

export default Home;
