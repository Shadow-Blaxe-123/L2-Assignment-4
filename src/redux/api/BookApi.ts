// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetAllBooks } from "./types";

// Define a service using a base URL and expected endpoints
export const booksAPi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-omega-black.vercel.app/api/books",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query<GetAllBooks, { limit: number; page: number }>({
      query: ({ limit, page }) => `/?limit=${limit}&page=${page}`, // Pagination params
      providesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const { useGetAllBooksQuery, useDeleteBookMutation } = booksAPi;
