import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Borrow, ResBorrow, ResBorrowSummary } from "./types";
import { booksAPi } from "./BookApi";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-omega-black.vercel.app/api/borrow",
  }),
  tagTypes: ["Borrow", "Book", "BorrowSummary"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<ResBorrow, Borrow>({
      query: (borrow) => ({
        url: "/",
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["BorrowSummary"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // ✅ Invalidate the Book tag from the booksApi slice
          dispatch(booksAPi.util.invalidateTags(["Book"]));
        } catch {
          // Optional: handle error if needed
        }
      },
    }),
    getBorrowSummary: builder.query<ResBorrowSummary, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["BorrowSummary"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
