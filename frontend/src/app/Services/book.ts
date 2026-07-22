import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book as BookModel } from '../models/book';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    private apiUrl = 'http://localhost:5000/books';

    constructor(private http: HttpClient) { }

    getAllBooks(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    getBookById(id: string): Observable<BookModel> {
        return this.http.get<BookModel>(`${this.apiUrl}/${id}`);
    }

}