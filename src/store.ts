import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import articlesReducer from "./slices/articlesSlice";
import preferencesReducer from "./slices/preferencesSlice";
import { ArticlesState, CacheItem } from "./types/store.types";
import { CACHE_VALIDITY_DURATION } from "./constants";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["preferences", "articles"],
  transform: [
    createTransform(
      (inboundState: ArticlesState) => inboundState,

      (outboundState: ArticlesState) => {
        const now = Date.now();
        const validCache: Record<string, CacheItem> = {};

        Object.entries(outboundState.cache).forEach(([key, cacheItem]) => {
          if (now - cacheItem.timestamp < CACHE_VALIDITY_DURATION) {
            validCache[key] = cacheItem;
          }
        });

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
});

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

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
