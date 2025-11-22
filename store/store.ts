import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      tokens: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["tokens/updatePrice"],
          // Ignore these field paths in all actions
          ignoredActionPaths: ["meta.arg", "payload.timestamp"],
          // Ignore these paths in the state
          ignoredPaths: ["tokens.items"],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
