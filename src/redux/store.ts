import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "@/services/api/base-api";
import apiMarketplaceSlice from "./slices/apiMarketplaceSlice";
import authSlice from "./slices/authSlice";
import notificationSlice from "./slices/notificationSlice";

/**
 * Slices are combined with `combineSlices` so later feature slices
 * (organization, dashboard, apiKey, subscription, billing, wallet)
 * can be added — or lazily injected — without touching consumers.
 */
const rootReducer = combineSlices(baseApi, authSlice, apiMarketplaceSlice, notificationSlice);

export type RootState = ReturnType<typeof rootReducer>;

/** A new store per request on the server, and one per browser tab. */
export function makeStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
  setupListeners(store.dispatch);
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
