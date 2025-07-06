import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";
import { booksAPi } from "./api/BookApi";
import paginationReducer from "./paginationSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    pagination: paginationReducer,
    isLoading: loadingReducer,
    [booksAPi.reducerPath]: booksAPi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksAPi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
