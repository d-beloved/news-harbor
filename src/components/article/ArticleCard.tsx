import React from "react";
import { Article } from "../../types/store.types";
import { LazyImage } from "../common/LazyImage";
import { format } from "timeago.js";
import { ArrowRightIcon, AuthorIcon, CalendarIcon } from "../../assets/Icons";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-50 hover:-translate-y-1 hover:bg-base-200/50"
    >
      {/* {article.urlToImage && ( */}
      <figure className="relative overflow-hidden h-48">
        <LazyImage
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className="badge badge-primary">{article.source}</span>
        </div>
      </figure>
      {/* )} */}

      <div className="card-body h-48 flex flex-col justify-between">
        <div className="grid grid-cols-2 items-center gap-2 mb-2 text-sm opacity-70">
          <time className="flex items-center gap-1 min-w-0">
            <CalendarIcon className="h-4 w-4 flex-shrink-0" />
            {format(new Date(article.publishedAt))}
          </time>
          {article.author && (
            <div className="flex items-center gap-1 min-w-0">
              <AuthorIcon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{article.author}</span>
            </div>
          )}
        </div>

        <h2 className="card-title font-bold hover:text-primary transition-colors line-clamp-3">
          {article.title}
        </h2>

        <div className="flex justify-end items-end text-primary">
          <ArrowRightIcon className="h-5 w-5" />
        </div>
      </div>
    </a>
  );
};
