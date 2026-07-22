import { Service } from '@angular/core';
import { IBook } from '../models/ibook';

@Service()
export class Bookservice {
  constructor(){}

  books: IBook[] = [
    {
      _id: "1",
      title: "Clean Code",
      author: "Robert C. Martin",
      price: 450,
      category: "Programming",
      available: true
    },
    {
      _id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      price: 320,
      category: "Self Development",
      available: true
    },
    {
      _id: "3",
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 250,
      category: "Novel",
      available: false
    },
    {
      _id: "4",
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
      price: 390,
      category: "Programming",
      available: true
    },
    {
      _id: "5",
      title: "Deep Work",
      author: "Cal Newport",
      price: 300,
      category: "Productivity",
      available: false
    }
  ];

  getAllBooks(): IBook[] {
    return this.books;
  }

  getBookById(id: string): IBook | undefined {
    return this.books.find(book => book._id === id);
  }

  addBook(book: IBook): void {
    this.books.push(book);
  }

  updateBook(updatedBook: IBook): void {
    const index = this.books.findIndex(book => book._id === updatedBook._id);

    if (index !== -1) {
      this.books[index] = updatedBook;
    }
  }

  deleteBook(id: string): void {
    this.books = this.books.filter(book => book._id !== id);
  }
}
