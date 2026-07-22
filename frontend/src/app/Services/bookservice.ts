import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../models/ibook';

export interface BooksResponse {
  books: IBook[];
}

@Injectable({
  providedIn: 'root'
})
export class Bookservice {

  private apiUrl = 'http://localhost:5000/books';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<BooksResponse> {
    return this.http.get<BooksResponse>(this.apiUrl);
  }

  getBookById(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.apiUrl}/${id}`);
  }

  addBook(book: IBook): Observable<IBook> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<IBook>(this.apiUrl, book, { headers });
  }

  updateBook(id: string, book: IBook): Observable<IBook> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<IBook>(`${this.apiUrl}/${id}`, book, { headers });
  }

  deleteBook(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  searchBook(keyword: string): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

}
