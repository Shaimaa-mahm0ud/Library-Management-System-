import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Bookservice, BooksResponse } from '../../../Services/bookservice';
import { IBook } from '../../../models/ibook';

@Component({
  selector:'app-dashboard',
  standalone:false,
  templateUrl:'./dashboard.html',
  styleUrl:'./dashboard.css'
})

export class Dashboard implements OnInit{
  constructor(private bookService:Bookservice, private cd:ChangeDetectorRef){}
  recentBooks: IBook[] = []
  lowStockBooks: IBook[] = []
  books:IBook[]=[];
  totalBooks=0;
  availableBooks=0;
  featuredBooks=0;
  categories=0;
  ngOnInit(){
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (res: BooksResponse) => {
        this.books = res.books;
        this.calculateStatistics();
        this.recentBooks = this.books.slice(0,5)
        this.lowStockBooks = this.books.filter(b => b.availableCopies<3)
        this.cd.detectChanges()
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  calculateStatistics(){
    this.totalBooks=this.books.length;
    this.availableBooks=this.books.filter(b=>b.availableCopies>0).length;
    this.featuredBooks=this.books.filter(b=>b.featured).length;
    this.categories=new Set(this.books.map(b=>b.category)).size;
  }

}
