import { FC, useMemo } from "react";
import { ArticleCard } from "./ArticleCard";
import { EmptyState } from "../common/EmptyState";
import { Article } from "../../types/store.types";
import { useAppSelector } from "../../hooks/store.hook";
import { ArticleCardSkeleton } from "./ArticleCardSkeleton";

interface ArticleListProps {
  items: Article[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  searchRequest?: string;
  loadMore: () => void;
}

export const ArticleList: FC<ArticleListProps> = ({
  items,
  loading,
  error,
  hasMore,
  searchRequest,
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
    return <EmptyState message={error} />;
  }

  if (filteredItems.length === 0 && !loading) {
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
        {loading && items.length === 0
          ? Array.from({ length: 6 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))
          : filteredItems.map((article, index) => (
              <div
                key={`${article.id}-${index}`}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
      </div>

      {loading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <ArticleCardSkeleton key={`more-${index}`} />
          ))}
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
            ) : searchRequest ? (
              "Search More Articles"
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
