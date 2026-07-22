import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookservice } from '../../../Services/bookservice';

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
      price: ['', Validators.required],
      category: [''],
      available: [true]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = id;

      const book = this.bookService.getBookById(id);

      if (book) {
        this.bookForm.patchValue(book);
      }
    }
  }

  save() {

    if (this.bookForm.invalid) return;

    const updatedBook = {
      _id: this.bookId,
      ...this.bookForm.value
    };

    this.bookService.updateBook(updatedBook);

    alert("Book Updated Successfully");

    this.router.navigate(['/admin']);

  }

}
