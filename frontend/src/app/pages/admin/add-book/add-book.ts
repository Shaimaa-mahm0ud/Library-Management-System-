import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bookservice } from '../../../Services/bookservice';

@Component({
  selector: 'app-add-book',
  standalone: false,
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
  bookForm!:FormGroup
  constructor(
    private fb: FormBuilder,
    private bookService: Bookservice,
    private router: Router
  ) {
      this.bookForm = this.fb.group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        price: [0, Validators.required],
        category: [''],
        available: [true]
      });
    }

  save() {

    if (this.bookForm.invalid) return;

    this.bookService.addBook(this.bookForm.value as any);

    alert("Book Added Successfully");

    this.router.navigate(['/admin']);
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

}
