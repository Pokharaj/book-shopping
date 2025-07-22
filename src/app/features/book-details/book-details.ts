import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, CommonModule, HttpClientModule, MatExpansionModule, MatIconModule, MatSnackBarModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss'
})
export class BookDetails implements OnInit {
  book: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const ISBN = this.route.snapshot.paramMap.get('ISBN');
    this.http.get<any[]>('/book_data.json').subscribe(books => {
      this.book = books.find(b => b.ISBN === ISBN);
    });
  }

  getCart() {
    return this.cartService.getCart();
  }

  setCart(cart: any[]) {
    this.cartService.setCart(cart);
  }

  getBookQuantity(): number {
    if (!this.book) return 0;
    const cart = this.getCart();
    const item = cart.find((i: any) => i.ISBN === this.book.ISBN);
    return item ? item.quantity : 0;
  }

  addToCart(book: any) {
    let cart = this.getCart();
    const idx = cart.findIndex((item: any) => item.ISBN === book.ISBN);
    if (idx > -1) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ ISBN: book.ISBN, title: book.title, quantity: 1, price: book.price });
    }
    this.setCart(cart);
    this.snackBar.open(`${book.title} added to cart!`, 'Close', { duration: 2000 });
  }

  incrementBook() {
    if (!this.book) return;
    let cart = this.getCart();
    const idx = cart.findIndex((item: any) => item.ISBN === this.book.ISBN);
    if (idx > -1) {
      cart[idx].quantity += 1;
      this.setCart(cart);
      this.snackBar.open(`Increased quantity of ${this.book.title}`, 'Close', { duration: 1500 });
    }
  }

  decrementBook() {
    if (!this.book) return;
    let cart = this.getCart();
    const idx = cart.findIndex((item: any) => item.ISBN === this.book.ISBN);
    if (idx > -1) {
      if (cart[idx].quantity > 1) {
        cart[idx].quantity -= 1;
        this.setCart(cart);
        this.snackBar.open(`Decreased quantity of ${this.book.title}`, 'Close', { duration: 1500 });
      } else {
        cart.splice(idx, 1);
        this.setCart(cart);
        this.snackBar.open(`${this.book.title} removed from cart!`, 'Close', { duration: 1500 });
      }
    }
  }

  removeBook() {
    if (!this.book) return;
    let cart = this.getCart();
    const idx = cart.findIndex((item: any) => item.ISBN === this.book.ISBN);
    if (idx > -1) {
      cart.splice(idx, 1);
      this.setCart(cart);
      this.snackBar.open(`${this.book.title} removed from cart!`, 'Close', { duration: 1500 });
    }
  }
}
