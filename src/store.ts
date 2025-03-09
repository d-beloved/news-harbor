import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import articlesReducer from "./slices/articlesSlice";
import preferencesReducer from "./slices/preferencesSlice";
import { ArticlesState, CacheItem, UserPreferences } from "./types/store.types";
import { CACHE_VALIDITY_DURATION } from "./constants";

interface InitRootState {
  articles: ArticlesState;
  preferences: UserPreferences;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["preferences", "articles"],
  transforms: [
    createTransform(
      (inboundState: ArticlesState) => inboundState,

      (outboundState: ArticlesState) => {
        if (!outboundState.cache) return outboundState;

        const now = Date.now();
        const validCache: Record<string, CacheItem> = {};

        try {
          Object.entries(outboundState.cache).forEach(([key, cacheItem]) => {
            if (now - cacheItem.timestamp < CACHE_VALIDITY_DURATION) {
              validCache[key] = cacheItem;
            }
          });
        } catch (error) {
          console.error("Error validating cache:", error);
          return outboundState;
        }

        return {
          ...outboundState,
          cache: validCache,
          loading: false,
          error: null,
        };
      },
      { whitelist: ["articles"] },
    ),
  ],
};

const rootReducer = combineReducers({
  articles: articlesReducer,
  preferences: preferencesReducer,
}) as Reducer<InitRootState>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
