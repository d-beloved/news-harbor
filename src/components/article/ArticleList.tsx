import { FC, useMemo } from "react";
import { ArticleCard } from "./ArticleCard";
import { EmptyState } from "../common/EmptyState";
import { Article } from "../../types/store.types";
import { useAppSelector } from "../../hooks/store.hook";

interface ArticleListProps {
  items: Article[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export const ArticleList: FC<ArticleListProps> = ({
  items,
  loading,
  error,
  hasMore,
  loadMore,
}) => {
  const activeFilters = useAppSelector((state) => state.articles.activeFilters);

  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Apply category and source filters
    if (activeFilters?.category || activeFilters?.source) {
      filtered = filtered.filter((article) => {
        const matchesCategory =
          !activeFilters.category ||
          article.category?.toLowerCase() ===
            activeFilters.category.toLowerCase();
        const matchesSource =
          !activeFilters.source ||
          article.source.toLowerCase().replace(/\s+/g, "-") ===
            activeFilters.source;
        return matchesCategory && matchesSource;
      });
    }

    // Sort by date
    if (activeFilters?.dateSort) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return activeFilters.dateSort === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return filtered;
  }, [items, activeFilters]);

  if (error) {
    return (
      <div role="alert" className="alert alert-error flex justify-center">
        <span className="text-lg font-bold">{error}</span>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <EmptyState
        message={
          activeFilters.category || activeFilters.source
            ? "No articles found with current filters. Try adjusting your selection."
            : "No articles found. Try adjusting your filters or preferences."
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((article, index) => (
          <div key={`${article.id}-${index}`}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center p-4">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      <div className="text-center p-4">
        {hasMore && !activeFilters.category && !activeFilters.source ? (
          <button
            onClick={loadMore}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Articles"}
          </button>
        ) : (
          filteredItems.length > 0 && (
            <div className="text-gray-600">No more articles to load</div>
          )
        )}
      </div>
    </div>
  );
};
