import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../Services/book';
import { Bookservice } from '../../Services/bookservice';
import { Book } from '../../models/book';
import { IBook } from '../../models/ibook';

@Component({
  selector: 'app-book-details',
  standalone: false,
  templateUrl: './book-details.html',
  styleUrls: ['./book-details.css']
})
export class BookDetailsComponent implements OnInit {

  book!: Book;
  relatedBooks: IBook[] = [];
  loading = true;
  errorMessage = '';
  borrowMessage = '';
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private bookListService: Bookservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (data: Book) => {
          this.book = data;
          this.loading = false;
          this.isFavorite = this.checkFavorite();
          this.loadRelatedBooks();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Book not found.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.loading = false;
      this.errorMessage = 'No book ID provided.';
      this.cdr.detectChanges();
    }
  }

  private loadRelatedBooks(): void {
    this.bookListService.getAllBooks().subscribe({
      next: (response) => {
        this.relatedBooks = response.books
          .filter((b: IBook) => b.category === this.book.category && b._id !== this.book._id)
          .slice(0, 4);
        this.cdr.detectChanges();
      },
      error: () => {
        this.relatedBooks = [];
      }
    });
  }

  getStarArray(rating: number): boolean[] {
    const stars: boolean[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }

  getAvailabilityPercent(): number {
    if (!this.book || this.book.totalCopies === 0) return 0;
    return Math.round((this.book.availableCopies / this.book.totalCopies) * 100);
  }

  borrowBook(): void {
    if (!this.book) return;
    this.borrowMessage = '';
    this.bookListService.borrowBook(this.book._id).subscribe({
      next: (res) => {
        this.borrowMessage = res.msg || 'Book borrowed successfully!';
        this.book.availableCopies = Math.max(0, this.book.availableCopies - 1);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.borrowMessage = err.error?.msg || 'Failed to borrow book.';
        this.cdr.detectChanges();
      }
    });
  }

  navigateToBook(bookId: string): void {
    this.router.navigate(['/book', bookId]);
  }

  toggleFavorite(): void {
    if (!this.book) return;
    const favorites = this.getFavorites();
    const index = favorites.indexOf(this.book._id);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(this.book._id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.isFavorite = !this.isFavorite;
    this.cdr.detectChanges();
  }

  private checkFavorite(): boolean {
    if (!this.book) return false;
    return this.getFavorites().includes(this.book._id);
  }

  private getFavorites(): string[] {
    const raw = localStorage.getItem('favorites');
    return raw ? JSON.parse(raw) : [];
  }
}
