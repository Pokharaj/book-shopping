import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {
  books: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/book_data.json').subscribe(data => {
      this.books = data;
    });
  }

  addToCart(book: any) {
    // Placeholder for cart logic
    alert(`${book.title} added to cart!`);
  }
}
