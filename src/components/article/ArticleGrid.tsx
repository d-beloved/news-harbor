import { Article } from "../../types/store.types";
import { ArticleCard } from "./ArticleCard";
import { ArticleCardSkeleton } from "./ArticleCardSkeleton";

interface ArticleGridProps {
  articles: Article[];
  loading?: boolean;
  skeletonCount?: number;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  loading,
  skeletonCount = 6,
}) => (
  <div className="grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
    {loading && articles.length === 0
      ? Array.from({ length: skeletonCount }).map((_, index) => (
          <ArticleCardSkeleton key={`skeleton-${index}`} />
        ))
      : articles.map((article, index) => (
          <div
            key={`${article.id}-${index}`}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ArticleCard article={article} />
          </div>
        ))}
  </div>
);
