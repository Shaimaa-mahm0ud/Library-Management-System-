import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  constructor( private bookservice:Bookservice, private router:Router, private cd:ChangeDetectorRef){}
  mybooks:IBook[]=[]
  ngOnInit(): void {
    this.loadBooks()
  }
  loadBooks(){
    this.bookservice.getAllBooks().subscribe({
      next: (res)=>{
        this.mybooks = res.books
        this.cd.detectChanges()
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
  delete(id:string){
    const ok = confirm("Are you sure you want to delete this book")
    if(!ok) return
    this.bookservice.deleteBook(id).subscribe({
      next: ()=>{
        this.loadBooks()
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
  edit(id:string){
    this.router.navigate(['../admin/edit-book', id])
  }
  addBook(){
    this.router.navigate(['../admin/add-book'])
  }
}
