import React from "react";
import { Article } from "../../types/store.types";
import { LazyImage } from "../common/LazyImage";

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
        <div className="flex items-center gap-2 mb-2 text-sm opacity-70">
          <time className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(article.publishedAt).toLocaleDateString()}
          </time>
        </div>

        <h2 className="card-title font-bold hover:text-primary transition-colors line-clamp-3">
          {article.title}
        </h2>

        <div className="flex justify-end items-end text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </a>
  );
};
