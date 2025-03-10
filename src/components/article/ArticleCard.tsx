import React from "react";
import { Article } from "../../types/store.types";
import { ArrowRightIcon } from "../../assets/Icons";
import { ArticleImage } from "./ArticleImage";
import { ArticleMetadata } from "./ArticleMetadata";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-50 hover:-translate-y-1 hover:bg-base-200/50"
    data-testid="article-card"
  >
    <ArticleImage
      imageUrl={article.urlToImage}
      title={article.title}
      source={article.source}
    />

    <div className="card-body h-48 flex flex-col justify-between">
      <ArticleMetadata
        publishedAt={article.publishedAt}
        author={article.author}
      />

      <h2 className="card-title font-bold hover:text-primary transition-colors line-clamp-3">
        {article.title}
      </h2>

      <div className="flex justify-end items-end text-primary">
        <ArrowRightIcon className="h-5 w-5" />
      </div>
    </div>
  </a>
);
