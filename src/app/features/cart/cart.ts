import { Component, Inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, RouterModule, CommonModule, MatSnackBarModule, MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  cartItems: any[] = [];

  constructor(private snackBar: MatSnackBar, private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  getCart() {
    return this.cartService.getCart();
  }

  setCart(cart: any[]) {
    this.cartService.setCart(cart);
    this.cartItems = this.getCart();
  }

  removeFromCart(item: any) {
    let cart = this.getCart();
    this.cartItems = cart.filter(i => i.ISBN !== item.ISBN);
    this.setCart(this.cartItems);
    this.snackBar.open(`${item.title} removed from cart!`, 'Close', { duration: 2000 });
  }

  incrementQuantity(item: any) {
    let cart = this.getCart();
    const idx = cart.findIndex(i => i.ISBN === item.ISBN);
    if (idx > -1) {
      cart[idx].quantity += 1;
      this.setCart(cart);
      this.snackBar.open(`Increased quantity of ${item.title}`, 'Close', { duration: 1500 });
    }
  }

  decrementQuantity(item: any) {
    let cart = this.getCart();
    const idx = cart.findIndex(i => i.ISBN === item.ISBN);
    if (idx > -1) {
      if (cart[idx].quantity > 1) {
        cart[idx].quantity -= 1;
        this.setCart(cart);
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
