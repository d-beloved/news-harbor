import { FC, useCallback, useRef } from "react";
import { ArticleCard } from "./ArticleCard";
import { EmptyState } from "../common/EmptyState";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { Article } from "../../types/store.types";

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
  const observer = useRef<IntersectionObserver | null>(null);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState message="No articles found. Try adjusting your filters or preferences." />
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((article, index) => (
            <div
              key={article.id}
              ref={index === items.length - 1 ? lastArticleRef : null}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center p-4">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!hasMore && items.length > 0 && (
          <div className="text-center p-4 text-gray-600">
            No more articles to load
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
