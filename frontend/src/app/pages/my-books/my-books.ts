import { Component } from '@angular/core';

@Component({
  selector: 'app-my-books',
  standalone: false,
  templateUrl: './my-books.html',
  styleUrls: ['./my-books.css'],
})
export class MyBooks {
  darkMode = false;

  books = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://covers.openlibrary.org/b/id/10523338-L.jpg',
      borrowDate: '2026-07-01',
      dueDate: '2026-07-20',
      returnDate: null,
      status: 'borrowed',
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      cover: 'https://covers.openlibrary.org/b/id/9611996-L.jpg',
      borrowDate: '2026-06-15',
      dueDate: '2026-07-01',
      returnDate: null,
      status: 'late',
    },
    {
      id: 3,
      title: 'Deep Work',
      author: 'Cal Newport',
      cover: 'https://covers.openlibrary.org/b/id/11153218-L.jpg',
      borrowDate: '2026-05-10',
      dueDate: '2026-05-30',
      returnDate: '2026-05-25',
      status: 'returned',
    },
  ];

  get totalBooks() {
    return this.books.length;
  }

  get activeBooks() {
    return this.books.filter((x) => x.status === 'borrowed').length;
  }

  get lateBooks() {
    return this.books.filter((x) => x.status === 'late').length;
  }

  get returnedBooks() {
    return this.books.filter((x) => x.status === 'returned').length;
  }

  formatDate(date: any) {
    if (!date) return '—';
    return new Date(date).toLocaleDateString();
  }

  returnBook(id: number) {
    const book = this.books.find((x) => x.id === id);

    if (!book) return;

    book.status = 'returned';
    book.returnDate = new Date().toISOString();
  }
}
