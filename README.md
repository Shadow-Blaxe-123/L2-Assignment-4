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
- [x] Edit/Borrow/Delete btns Ui
- [x] Delete Logic
- [x] Make Delete Confirmation popup
- [x] Delete Toaster
- [x] Make an Edit page
- [x] Make the RTK Queries for the edit
- [ ] Make the RTK Queries for the edit/borrow/borrow summary.
- [ ] A Borrow Modal success or toast
- [ ] Make toasts for every action

Features


Borrow Book: Opens a simple form to borrow a book.
Add New Book:
Button to open a form for creating a new book.
Fields: Title, Author, Genre, ISBN, Description, Copies, Available (optional, defaults to true).
After creation, redirect to book list and update UI immediately.
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
Navbar: Simple navigation bar with links to:
All Books
Add Book
Borrow Summary

Bonus Features
These are optional and will earn extra points:

Feature	Bonus
Optimistic UI Updates	+2
Toast Notifications	+2
Responsive Layout	+4
Type-Safe Forms	+2

Backend Requirements (Moduler/MVC Pattern):
Database: Use MongoDB with a schema including:
Books (with attributes like title, author, genre, isbn, description, copies, available)
Borrows (linked to book, quantity, dueDate etc)
Book Management:
Implement CRUD operations for book (create, read, update, delete).
Borrow Management:
Execute CRUD operations for borrow (borrow, summery), ensuring copies levels before borrow are placed.
Error Handling:
Establish consistent, user-friendly error messa.
Additional Changes:
Ensure backend APIs support pagination for book listings and order retrieval.
Add authentication middleware to protect private routes (if needed).
You may use an existing backend that you have developed previously or create a new version by modifying the older one. Make any additional updates if necessary.


Submission:
GitHub Repository Link (backend and frontend) with Professional README file
Live Deployment Link (backend and frontend)