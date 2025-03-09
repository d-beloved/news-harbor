import React from "react";
import { Filters } from "../components/filters";
import { ArticleList } from "../components/article/ArticleList";
import { useArticlesContext } from "../context/ArticlesContext";

const Home: React.FC = () => {
  const { items, loading, error, hasMore, loadMore, searchRequest } =
    useArticlesContext();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Your Global News Hub
        </h1>
        <p className="mt-4 text-base-content/70 text-lg font-bold">
          Stay informed with curated news from trusted sources worldwide
        </p>
      </div>

      {items.length > 0 && (
        <div className="animate-slide-up">
          <Filters />
        </div>
      )}

      <ArticleList
        items={items}
        loading={loading}
        error={error}
        hasMore={hasMore}
        searchRequest={searchRequest}
        loadMore={loadMore}
      />
    </div>
  );
};

export default Home;
