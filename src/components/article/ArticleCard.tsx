import React from "react";
import { Link } from "react-router";
import { Article } from "../../types/store.types";
import { LazyImage } from "../common/LazyImage";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
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
        <h2 className="card-title">{article.title}</h2>
        <p className="line-clamp-3">{article.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/article/${article.id}`} className="btn btn-primary">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
