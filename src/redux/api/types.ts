export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  description: string;
};

export interface ResBooks {
  success: boolean;
  message: string;
  data: Book[];
}

export interface NavbarState {
  isOpen: boolean;
  borrowSummaryDialogState: boolean;
}

export interface PaginationState {
  limit: number;
  page: number;
}

export interface DeleteBook {
  success: boolean;
  message: string;
  data: null;
}

export interface Borrow {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface ResBorrow {
  success: boolean;
  message: string;
  data: Borrow & {
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface BorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export interface ResBorrowSummary {
  success: boolean;
  message: string;
  data: BorrowSummary[];
}
