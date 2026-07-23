import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IBook } from '../../models/ibook';
import { Bookservice } from '../../Services/bookservice';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.html',
  styleUrls: ['./book.css'],
})
export class BookComponent implements OnInit {
  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  borrowingMessage: string = '';
  searchKeyword: string = '';
  isAdmin=false
  selectedCategory: string = '';
  categories: string[] = [];
  availabilityFilter: string = '';
  sortBy: string = 'rating';

  constructor(
    private bookService: Bookservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    this.isAdmin = user?.role === 'admin'
    this.bookService.getAllBooks().subscribe({
      next: (response) => {
        this.books = [...response.books];
        this.extractCategories();
        this.applyFilters();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  private extractCategories(): void {
    const catSet = new Set<string>();
    this.books.forEach(b => {
      if (b.category) catSet.add(b.category);
    });
    this.categories = Array.from(catSet).sort();
  }

  getAvailableCount(): number {
    return this.books.filter(b => b.availableCopies > 0).length;
  }

  getFeaturedCount(): number {
    return this.books.filter(b => b.featured).length;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.books];

    if (this.selectedCategory) {
      result = result.filter(b => b.category === this.selectedCategory);
    }

    if (this.availabilityFilter === 'available') {
      result = result.filter(b => b.availableCopies > 0);
    } else if (this.availabilityFilter === 'unavailable') {
      result = result.filter(b => b.availableCopies <= 0);
    }

    if (this.searchKeyword.trim()) {
      const keyword = this.searchKeyword.trim().toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(keyword) ||
        b.author.toLowerCase().includes(keyword) ||
        b.category.toLowerCase().includes(keyword)
      );
    }

    switch (this.sortBy) {
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
    }

    this.filteredBooks = result;
  }

  resetFilters(): void {
    this.selectedCategory = '';
    this.availabilityFilter = '';
    this.sortBy = 'rating';
    this.searchKeyword = '';
    this.applyFilters();
  }

  search(): void {
    this.applyFilters();
  }

  borrow(bookId: string): void {
    this.borrowingMessage = '';
    this.bookService.borrowBook(bookId).subscribe({
      next: (res) => {
        this.borrowingMessage = res.msg || 'Book borrowed successfully!';
        this.ngOnInit();
      },
      error: (err) => {
        this.borrowingMessage = err.error?.msg || 'Failed to borrow book.';
      }
    });
  }
}
