# Library Management App for Assignment-4

This is a minimalist full-stack website to manage a library. Below is the live link.

## Features

- 📘 Add new books to the library.
- ✏️ Edit existing book details.
- 🗑️ Delete books from the collection.
- 🔄 Borrow books and track availability.
- 📊 View a summary of all borrowed books.
- 📄 Paginated book listing.
- ⚡ Optimistic UI updates for seamless user experience.

## Tech

### Frontend

- React
- Vite
- Typescript
- ShadCn UI
- Redux Toolkit
- React-Spinner

### Backend

- Express
- MongoDB
- Mongoose
- Typescript
- NodeJS
  
```bash
# Clone the repo
git clone https://github.com/Shadow-Blaxe-123/L2-Assignment-4.git
cd library-app

# Install dependencies
npm install

# Start the development server
npm run dev

```

```bash
├── src/
│   ├── components/       # UI components (Borrow, Edit, Delete modals, etc.)
│   ├── redux/            # Redux slices and API services
│   ├── App.tsx           # App entry
│   ├── Layout.tsx        # The Layout of the Ui
│   └── main.tsx          # Vite entry

```

## Notes

- Optimistic updates are implemented for a smooth UX, especially on slow networks.
- Global loading state is handled via Redux for better user feedback.
= All features are built mobile-responsive with modern UI standards.
