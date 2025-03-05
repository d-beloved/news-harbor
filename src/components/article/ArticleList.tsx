import { FC, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { EmptyState } from "../common/EmptyState";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { Pagination } from "../common/Pagination";
import { Article } from "../../types/store.types";

const ARTICLES_PER_PAGE = 10;

interface ArticleListProps {
  items: Article[];
  loading: boolean;
  error: string | null;
}

export const ArticleList: FC<ArticleListProps> = ({
  items,
  loading,
  error,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedItems = items.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE,
  );

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

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
          {paginatedItems.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
