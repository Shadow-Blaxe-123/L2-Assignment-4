export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
};

export interface GetAllBooks {
  success: boolean;
  message: string;
  data: Book[];
}

export interface NavbarState {
  isOpen: boolean;
}

export interface PaginationState {
  limit: number;
  page: number;
}
