import React from "react";

export const ArticleCardSkeleton: React.FC = () => {
  return (
    <div className="card bg-base-100 shadow-lg animate-pulse">
      <div className="h-48 bg-base-200"></div>
      <div className="card-body h-48">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-32 bg-base-200 rounded"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-base-200 rounded w-3/4"></div>
          <div className="h-4 bg-base-200 rounded w-1/2"></div>
        </div>
        <div className="flex justify-end">
          <div className="h-5 w-5 bg-base-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
