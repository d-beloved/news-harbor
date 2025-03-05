import React from "react";
import { Article } from "../../types/store.types";

interface ArticleDetailProps {
  article: Article;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  return (
    <article className="prose lg:prose-xl mx-auto">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      <div className="mt-6">
        <h1>{article.title}</h1>

        <div className="flex items-center gap-4 text-sm opacity-75 my-4">
          <span>{article.source}</span>
          <span>•</span>
          <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
          {article.author && (
            <>
              <span>•</span>
              <span>{article.author}</span>
            </>
          )}
        </div>

        <p className="lead">{article.description}</p>

        <div className="mt-4">{article.content}</div>

        <div className="mt-8 p-4 bg-base-200 rounded-lg">
          <p className="text-sm">
            Original article:{" "}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              Read on {article.source}
            </a>
          </p>
        </div>
      </div>
    </article>
  );
};
