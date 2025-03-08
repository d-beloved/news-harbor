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
      <div
        role="alert"
        className="alert alert-error shadow-lg max-w-2xl mx-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="font-medium">{error}</span>
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
    <div className="space-y-8 relative z-[1]">
      <div className="grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {filteredItems.map((article, index) => (
          <div
            key={`${article.id}-${index}`}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center p-8">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      )}

      <div className="text-center p-4">
        {hasMore && !activeFilters.category && !activeFilters.source ? (
          <button
            onClick={loadMore}
            className="btn btn-primary btn-wide hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Discover More Articles"
            )}
          </button>
        ) : (
          filteredItems.length > 0 && (
            <div className="text-base-content/70 font-medium">
              You've reached the end of your personalized feed
            </div>
          )
        )}
      </div>
    </div>
  );
};
