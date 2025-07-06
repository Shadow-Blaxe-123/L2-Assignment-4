// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, DeleteBook, ResBooks } from "./types";

// Define a service using a base URL and expected endpoints
export const booksAPi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-omega-black.vercel.app/api/books",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query<ResBooks, { limit: number; page: number }>({
      query: ({ limit, page }) =>
        `/?sort=desc&limit=${limit}&sortBy=createdAt&page=${page}`, // Pagination params
      providesTags: ["Book"],
    }),
    deleteBook: builder.mutation<DeleteBook, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    editBook: builder.mutation<
      ResBooks,
      { id: string; newBook: Partial<Omit<Book, "_id">> }
    >({
      query: ({ id, newBook }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),
    addBook: builder.mutation<
      ResBooks,
      { book: Partial<Omit<Book, "_id">> } // ✅ Correct type
    >({
      query: ({ book }) => ({
        // ✅ Destructure `book`
        url: "/",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useDeleteBookMutation,
  useEditBookMutation,
  useAddBookMutation,
} = booksAPi;
