import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookservice } from '../../../Services/bookservice';
import { IBook } from '../../../models/ibook';

@Component({
  selector: 'app-edit-book',
  standalone: false,
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css'
})
export class EditBook implements OnInit {

  bookForm!: FormGroup;
  bookId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: Bookservice
  ) {}

  ngOnInit(): void {

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

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = id;

      this.bookService.getBookById(id).subscribe({
        next: (book: IBook) => {
          this.bookForm.patchValue(book);
        },
        error: (err) => {
          console.error(err);
          alert("Book not found");
        }
      });
    }
  }

  save(): void {

    if (this.bookForm.invalid) {
      return;
    }

    const updatedBook: IBook = {
      _id: this.bookId,
      ...this.bookForm.value
    };

    this.bookService.updateBook(this.bookId, updatedBook).subscribe({
      next: () => {
        alert("Book Updated Successfully");
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
        alert("Failed to update book");
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }

}
