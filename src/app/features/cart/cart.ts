import { Component, Inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, RouterModule, CommonModule, MatSnackBarModule, MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  cartItems: any[] = [];

  constructor(@Inject(DOCUMENT) private document: Document, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.cartItems = this.getCart();
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

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(i => i.ISBN !== item.ISBN);
    this.setCart(this.cartItems);
    this.snackBar.open(`${item.title} removed from cart!`, 'Close', { duration: 2000 });
  }

  incrementQuantity(item: any) {
    const idx = this.cartItems.findIndex(i => i.ISBN === item.ISBN);
    if (idx > -1) {
      this.cartItems[idx].quantity += 1;
      this.setCart(this.cartItems);
      this.snackBar.open(`Increased quantity of ${item.title}`, 'Close', { duration: 1500 });
    }
  }

  decrementQuantity(item: any) {
    const idx = this.cartItems.findIndex(i => i.ISBN === item.ISBN);
    if (idx > -1) {
      if (this.cartItems[idx].quantity > 1) {
        this.cartItems[idx].quantity -= 1;
        this.setCart(this.cartItems);
        this.snackBar.open(`Decreased quantity of ${item.title}`, 'Close', { duration: 1500 });
      } else {
        this.removeFromCart(item);
      }
    }
  }

  getTotalItems(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
}
