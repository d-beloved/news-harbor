import React, { createContext, useContext } from "react";
import { useArticles } from "../hooks/useArticles";
import { Article } from "../types/store.types";

interface ArticlesContextType {
  items: Article[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  searchRequest: string | undefined;
  loadMore: () => void;
  setSearchRequest: (keyword: string) => void;
}

const ArticlesContext = createContext<ArticlesContextType | null>(null);

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchRequest, setSearchRequest] = React.useState<string>();
  const { items, loading, error, hasMore, loadMore } =
    useArticles(searchRequest);

  return (
    <ArticlesContext.Provider
      value={{
        items,
        loading,
        error,
        hasMore,
        searchRequest,
        loadMore,
        setSearchRequest,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticlesContext = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error(
      "useArticlesContext must be used within an ArticlesProvider",
    );
  }
  return context;
};
