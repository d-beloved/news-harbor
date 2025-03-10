import { FC } from "react";
import { useAppSelector } from "../../hooks/store.hook";
import { EmptyState } from "../common/EmptyState";
import { Article } from "../../types/store.types";
import { useFilteredArticles } from "../../hooks/useFilteredArticles";
import { ArticleGrid } from "./ArticleGrid";
import { LoadMoreButton } from "../common/LoadMoreButton";

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
  const filteredItems = useFilteredArticles(items, activeFilters);

  if (error) {
    return <EmptyState message={error} />;
  }

  if (filteredItems.length === 0 && !loading) {
    const message =
      activeFilters.category || activeFilters.source
        ? "No articles found with current filters. Try adjusting your selection."
        : "No articles found. Try adjusting your filters or preferences.";
    return <EmptyState message={message} />;
  }

  const showLoadMore =
    hasMore && !activeFilters.category && !activeFilters.source;

  return (
    <div className="space-y-8 relative z-[1]">
      <ArticleGrid
        articles={filteredItems}
        loading={loading && items.length === 0}
      />

      {loading && items.length > 0 && (
        <ArticleGrid articles={[]} loading={true} skeletonCount={3} />
      )}

      <div className="text-center p-4">
        {showLoadMore ? (
          <LoadMoreButton
            loading={loading}
            onClick={loadMore}
            searchRequest={searchRequest}
          />
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
