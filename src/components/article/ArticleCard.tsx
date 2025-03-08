import React from "react";
import { Article } from "../../types/store.types";
import { LazyImage } from "../common/LazyImage";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).split(" ").slice(0, -1).join(" ") + "...";
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      {article.urlToImage && (
        <LazyImage
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="card-body">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-outline">{article.source}</span>
          <time className="text-sm opacity-70">
            {new Date(article.publishedAt).toLocaleDateString()}
          </time>
        </div>
        <h2 className="card-title">{truncateText(article.title, 60)}</h2>
        <p className="line-clamp-3">{truncateText(article.description, 120)}</p>
        <div className="card-actions justify-end">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
