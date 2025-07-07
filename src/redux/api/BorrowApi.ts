import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Borrow, ResBorrow } from "./types";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-omega-black.vercel.app/api/borrow",
  }),
  tagTypes: ["Borrow", "Book"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<ResBorrow, Borrow>({
      query: (borrow) => ({
        url: "/",
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["Borrow", "Book", { type: "Book", id: "LIST" }],
    }),
  }),
});

export const { useBorrowBookMutation } = borrowApi;
