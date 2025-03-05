import React from "react";
import { Link } from "react-router";
import { Article } from "../../types/store.types";
import { useAppSelector } from "../../hooks/store.hook";

interface RelatedArticlesProps {
  currentArticle: Article;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentArticle,
}) => {
  const articles = useAppSelector((state) => state.articles.items);

  const relatedArticles = articles
    .filter(
      (article) =>
        article.id !== currentArticle.id &&
        (article.category === currentArticle.category ||
          article.source === currentArticle.source),
    )
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="card bg-base-100 shadow-hover transition-shadow"
          >
            {article.urlToImage && (
              <figure>
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="h-40 w-full object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h3 className="card-title text-base line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm opacity-75">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
