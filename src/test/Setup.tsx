import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../store/slices/articlesSlice";
import preferencesReducer from "../store/slices/preferencesSlice";
import type { RootState } from "../store";
import type { Article, ArticlesState } from "../types/store.types";
import "@testing-library/jest-dom/vitest";

// Mock initial state for the articles slice
const mockInitialState: ArticlesState = {
  items: [],
  cache: {},
  loading: false,
  error: null,
  hasNextPage: true,
  activeFilters: {},
};

// Cleanup rendered DOM after each test
afterEach(() => {
  cleanup();
});

const rootReducer = combineReducers({
  articles: articlesReducer,
  preferences: preferencesReducer,
});

// Create test store with optional initial state override
export const createTestStore = (
  preloadedState: Partial<RootState> = {
    articles: mockInitialState,
    preferences: {
      preferredCategories: [],
      preferredSources: [],
    },
  },
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as Partial<ReturnType<typeof rootReducer>>,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// TestWrapper props interface for proper typing
interface TestWrapperProps {
  children: ReactNode;
  initialState?: Partial<RootState>;
}

// A wrapper component that provides a Redux store for tests
export const TestWrapper: React.FC<TestWrapperProps> = ({
  children,
  initialState,
}) => {
  const store = createTestStore(initialState);
  return <Provider store={store}>{children}</Provider>;
};

// A helper function to create a mock article for testing purposes
export const createMockArticle = (
  override: Partial<Article> = {},
): Article => ({
  id: "test-1",
  title: "Test Article",
  source: "Test Source",
  publishedAt: new Date().toISOString(),
  url: "https://test.com",
  urlToImage: "https://test.com/image.jpg",
  ...override,
});

// Re-export testing-library utilities for convenience in your tests
export * from "@testing-library/react";
