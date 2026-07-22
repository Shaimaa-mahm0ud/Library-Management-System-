import { Component, OnInit } from '@angular/core';
import { IBook } from '../../../models/ibook';
import { Bookservice } from '../../../Services/bookservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-books',
  standalone: false,
  templateUrl: './admin-books.html',
  styleUrl: './admin-books.css',
})
export class AdminBooks implements OnInit{
  constructor( private bookservice:Bookservice, private router:Router){}
  mybooks:IBook[]=[]
  ngOnInit(){
    this.mybooks = this.bookservice.getAllBooks()
  }
  delete(id:string){
    const ok = confirm("Are you sure you want to delete this book")
    if(!ok) return
    this.bookservice.deleteBook(id)
    this.mybooks=this.bookservice.getAllBooks()
  }
  edit(id:string){
    this.router.navigate(['../edit-book', id])
  }
  addBook(){
    this.router.navigate(['../add-book'])
  }
}
