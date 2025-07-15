import { Component, OnInit, Inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {
  books: any[] = [];

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.http.get<any[]>('/book_data.json').subscribe(data => {
      this.books = data;
    });
  }

  private getCart(): any[] {
    const match = this.document.cookie.match(new RegExp('(^| )cart=([^;]+)'));
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[2]));
      } catch {
        return [];
      }
    }
    return [];
  }

  private setCart(cart: any[]) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    this.document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; expires=${expires}; path=/`;
  }

  addToCart(book: any) {
    let cart = this.getCart();
    const idx = cart.findIndex((item: any) => item.ISBN === book.ISBN);
    if (idx > -1) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ ISBN: book.ISBN, title: book.title, quantity: 1 });
    }
    this.setCart(cart);
    this.snackBar.open(`${book.title} added to cart!`, 'Close', { duration: 2000 });
  }

  getBookQuantity(book: any): number {
    const cart = this.getCart();
    const item = cart.find((i: any) => i.ISBN === book.ISBN);
    return item ? item.quantity : 0;
  }

  incrementBook(book: any) {
    let cart = this.getCart();
    const idx = cart.findIndex((item: any) => item.ISBN === book.ISBN);
    if (idx > -1) {
      cart[idx].quantity += 1;
      this.setCart(cart);
      this.snackBar.open(`Increased quantity of ${book.title}`, 'Close', { duration: 1500 });
    }
  }

  decrementBook(book: any) {
    let cart = this.getCart();
    const idx = cart.findIndex((item: any) => item.ISBN === book.ISBN);
    if (idx > -1) {
      if (cart[idx].quantity > 1) {
        cart[idx].quantity -= 1;
        this.setCart(cart);
        this.snackBar.open(`Decreased quantity of ${book.title}`, 'Close', { duration: 1500 });
      } else {
        cart.splice(idx, 1);
        this.setCart(cart);
        this.snackBar.open(`${book.title} removed from cart!`, 'Close', { duration: 1500 });
      }
    }
  }

  removeBook(book: any) {
    let cart = this.getCart();
    const idx = cart.findIndex((item: any) => item.ISBN === book.ISBN);
    if (idx > -1) {
      cart.splice(idx, 1);
      this.setCart(cart);
      this.snackBar.open(`${book.title} removed from cart!`, 'Close', { duration: 1500 });
    }
  }
}
