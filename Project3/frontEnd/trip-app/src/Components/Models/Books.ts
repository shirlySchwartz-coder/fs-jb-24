export class Books {
  bookId: number;
  book_name: string;
  total_pages: number;
  book_price: number;
  authorId: number; //Forigen key
  firstName: string;
  lastName: string;

  constructor(
    bookId: number,
    book_name: string,
    total_pages: number,
    book_price: number,
    authorId: number,
    firstName: string,
    lastName: string
  ) {
    this.bookId = bookId;
    this.book_name = book_name;
    this.total_pages = total_pages;
    this.book_price = book_price;
    this.authorId = authorId;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
