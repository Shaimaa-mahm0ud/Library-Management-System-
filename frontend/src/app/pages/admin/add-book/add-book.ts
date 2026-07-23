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
  bookForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private bookService: Bookservice,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      price: [0],
      description: [''],
      image: [''],
      rating: [0],
      totalCopies: [1, Validators.required],
      availableCopies: [1, Validators.required],
      featured: [false]
    });
  }

  save() {

  if (this.bookForm.invalid) {
    this.bookForm.markAllAsTouched();
    return;
  }

  this.bookService.addBook(this.bookForm.value).subscribe({
    next: () => {
      alert("Book Added Successfully");
      this.router.navigate(['/admin/books']);
    },
    error: () => {
      alert("Failed to add book");
    }
  });

}

  cancel() {
    this.router.navigate(['/admin/books']);
  }

  get title() {
  return this.bookForm.get('title')!;
  }

  get author() {
    return this.bookForm.get('author')!;
  }

  get category() {
    return this.bookForm.get('category')!;
  }

  get totalCopies() {
    return this.bookForm.get('totalCopies')!;
  }

  get availableCopies() {
    return this.bookForm.get('availableCopies')!;
  }

}
