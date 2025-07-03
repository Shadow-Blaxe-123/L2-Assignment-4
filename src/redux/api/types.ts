type Book = {
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
