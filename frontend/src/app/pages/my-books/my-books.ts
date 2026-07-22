import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

interface MyBook {

  id: string;

  borrowingId: string;

  title: string;

  author: string;

  cover: string;

  borrowDate: string;

  dueDate: string;

  returnDate: string | null;

  status: string;

} 

@Component({
  selector: 'app-my-books',
  standalone: false,
  templateUrl: './my-books.html',
  styleUrls: ['./my-books.css'],
})
export class MyBooks implements OnInit {
  darkMode = false;
  
  books: MyBook[] = [];
  loading = true;
  constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
  this.loadBooks();
}

loadBooks() {

  console.time("API");

  this.loading = true;

  const token = localStorage.getItem("token");

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  this.http.get<any>(
    "http://localhost:5000/borrowings/myHistory",
    { headers }
  ).subscribe({

    next: (res) => {

      console.timeEnd("API");

      this.books = res.books || [];

      this.loading = false;
      this.cdr.detectChanges();

    },

    error: (err) => {

      console.timeEnd("API");

      console.log(err);

      this.loading = false;

    }

  });

}


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

  returnBook(bookId: string) {

  const token = localStorage.getItem("token");

  const headers = new HttpHeaders({

    Authorization: `Bearer ${token}`

  });

  this.http.post(

    "http://localhost:5000/borrowings/return",

    {

      bookId

    },

    {

      headers

    }

  ).subscribe({

    next: () => {

      this.loadBooks();

    },

    error: (err) => {

      console.log(err);

    }

  });

}
}
