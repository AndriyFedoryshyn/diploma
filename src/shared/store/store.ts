import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReducer/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppStateT = ReturnType<typeof store.getState>;
export type AppDispatchT = typeof store.dispatch;
