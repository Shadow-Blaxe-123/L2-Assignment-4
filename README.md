# Library Management App for Assignment-4

This is a minimalist full-stack website to manage a library.

## Features

- Create Books.
- Edit existing books on the database.
- Delete books.
- Borrow books.
- Get detailed summary of books borrowed.
- Filter by Genre
- Sort by any field in Ascending/Descending order.
- Pagination

## Tech

- React
- Vite
- Typescript
- ShadCn UI
- Redux Toolkit

## Todos

- [x] Make Navbar
- [x] add cors
- [x] add redux
- [x] Pagination
- [x] Add a loading icon for API shenagins
- [x] Fix the next button bug.
- [x] Edit/Borrow/Delete/Create btns Ui
- [x] Delete Logic
- [x] Make Delete Confirmation popup
- [x] Delete Toaster
- [x] Make an Edit page
- [x] Make an create page
- [x] Make the RTK Queries for the edit
- [x] Make the RTK Queries for the create
- [ ] Make the RTK Queries for the borrow/borrow summary.
- [ ] A Borrow Modal success or toast
- [ ] Make toasts for every action

Features


Borrow Book: Opens a simple form to borrow a book.

1. Borrow Book
Open from “Borrow” button in the book list.
Fields: Quantity (number), Due Date (date).
Business logic:
Quantity cannot exceed available copies.
If copies reaches 0, the book is marked unavailable.
Submit via API and show success message.
Redirect to borrow summary page.
1. Borrow Summary
Displays a list of books that have been borrowed, along with the total quantity borrowed for each book.
Retrieved from aggregation API.
Columns: Book Title, ISBN, Total Quantity Borrowed.
Landing Page Components
Borrow Summary

Bonus Features
These are optional and will earn extra points:

Feature	Bonus
Optimistic UI Updates	+2