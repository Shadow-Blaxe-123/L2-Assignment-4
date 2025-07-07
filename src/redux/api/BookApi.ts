// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, DeleteBook, ResBooks } from "./types";
import { borrowApi } from "./BorrowApi";
import type { RootState } from "@/redux/store";

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
      providesTags: ["Book", { type: "Book", id: "LIST" }],
    }),
    deleteBook: builder.mutation<DeleteBook, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
      onQueryStarted: async (id, { dispatch, getState, queryFulfilled }) => {
        const { page, limit } = (getState() as RootState).pagination;
        const patchResult = dispatch(
          booksAPi.util.updateQueryData(
            "getAllBooks",
            { limit, page },
            (draft) => {
              draft.data = draft.data.filter((book) => book._id !== id);
            }
          )
        );
        // dispatch(setLoading(false));
        try {
          await queryFulfilled;
          // ✅ Invalidate the Book tag from the booksApi slice
          dispatch(borrowApi.util.invalidateTags(["BorrowSummary"]));
        } catch {
          patchResult.undo();
          // Optional: handle error if needed
        }
      },
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
      onQueryStarted: async (
        { id, newBook },
        { dispatch, queryFulfilled, getState }
      ) => {
        const { page, limit } = (getState() as RootState).pagination;

        const patchResult = dispatch(
          booksAPi.util.updateQueryData(
            "getAllBooks",
            { limit, page },
            (draft) => {
              const book = draft.data.find((b) => b._id === id);
              if (book) {
                Object.assign(book, newBook);
              }
            }
          )
        );
        try {
          await queryFulfilled;
          // ✅ Invalidate the Book tag from the booksApi slice
          dispatch(borrowApi.util.invalidateTags(["BorrowSummary"]));
        } catch {
          patchResult.undo();
          // Optional: handle error if needed
        }
      },
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
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        // Update cache immediately before server response:
        const patchResult = dispatch(
          booksAPi.util.updateQueryData(
            "getAllBooks",
            { limit: 10, page: 1 }, // adjust based on your pagination params or fetch from store
            (draft) => {
              // Push a "temporary" book object to the cached list
              draft.data.unshift({
                // _id could be a temporary id for optimistic UI
                _id: "temp-id-" + Math.random().toString(36).substring(2, 9),
                title: arg.book.title || "Untitled",
                author: arg.book.author || "",
                genre: arg.book.genre || "",
                isbn: arg.book.isbn || "",
                copies: arg.book.copies || 1,
                available: arg.book.available ?? true,
                description: arg.book.description || "No description",
                // Add other fields if needed
              });
            }
          )
        );

        try {
          const { data: addedBook } = await queryFulfilled;

          // Optionally replace the temp book with the real one returned from server
          dispatch(
            booksAPi.util.updateQueryData(
              "getAllBooks",
              { limit: 10, page: 1 },
              (draft) => {
                const index = draft.data.findIndex((b) =>
                  b._id.startsWith("temp-id-")
                );
                if (index !== -1) {
                  draft.data[index] = addedBook.data[0]; // Assuming server returns added book as first item
                }
              }
            )
          );
        } catch {
          // If server call fails, rollback the optimistic update
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useDeleteBookMutation,
  useEditBookMutation,
  useAddBookMutation,
} = booksAPi;
