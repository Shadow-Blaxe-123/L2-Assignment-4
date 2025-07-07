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
- [x] Make the RTK Queries for the borrow.
- [x] A Borrow Modal success or toast
- [ ] Make the RTK Queries for the borrow summary.
- [ ] Make toasts for every action

Features


Borrow Book: Opens a simple form to borrow a book.

1. Borrow Book
Redirect to borrow summary page.
1. Borrow Summary
Displays a list of books that have been borrowed, along with the total quantity borrowed for each book.
Retrieved from aggregation API.
Columns: Book Title, ISBN, Total Quantity Borrowed.

Bonus Features
These are optional and will earn extra points:

Feature	Bonus
Optimistic UI Updates	+2