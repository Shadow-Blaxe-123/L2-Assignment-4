import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Borrow, ResBorrow, ResBorrowSummary } from "./types";
import { booksAPi } from "./BookApi";
import type { RootState } from "../store";

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
      onQueryStarted: async (
        borrow,
        { dispatch, queryFulfilled, getState }
      ) => {
        const { page, limit } = (getState() as RootState).pagination;
        const patchResult = dispatch(
          booksAPi.util.updateQueryData(
            "getAllBooks",
            { limit, page },
            (draft) => {
              const book = draft.data.find((b) => b._id === borrow.book);
              if (book) {
                book.copies -= borrow.quantity;
                book.available = book.copies > 0;
              }
            }
          )
        );
        try {
          await queryFulfilled;
          // ✅ Invalidate the Book tag from the booksApi slice
          dispatch(booksAPi.util.invalidateTags(["Book"]));
        } catch {
          // Optional: handle error if needed
          patchResult.undo();
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
