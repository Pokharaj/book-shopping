import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, RouterModule, CommonModule, MatSnackBarModule, MatIconModule, MatDividerModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit, OnDestroy {
  cartItems: any[] = [];
  private cartSubscription?: Subscription;

  constructor(private snackBar: MatSnackBar, private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
    
    // Subscribe to cart count changes to refresh cart items
    this.cartSubscription = this.cartService.cartCount$.subscribe(() => {
      this.loadCartItems();
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  loadCartItems() {
    try {
      this.cartItems = this.cartService.getCart();
      console.log('Cart items loaded:', this.cartItems);
    } catch (error) {
      console.error('Error loading cart items:', error);
      this.cartItems = [];
    }
  }

  getCart() {
    return this.cartService.getCart();
  }

  setCart(cart: any[]) {
    try {
      this.cartService.setCart(cart);
      this.cartItems = this.getCart();
      console.log('Cart updated:', this.cartItems);
    } catch (error) {
      console.error('Error setting cart:', error);
      this.snackBar.open('Error updating cart', 'Close', { duration: 3000 });
    }
  }

  removeFromCart(item: any) {
    try {
      let cart = this.getCart();
      this.cartItems = cart.filter(i => i.ISBN !== item.ISBN);
      this.setCart(this.cartItems);
      this.snackBar.open(`${item.title} removed from cart!`, 'Close', { duration: 2000 });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      this.snackBar.open('Error removing item from cart', 'Close', { duration: 3000 });
    }
  }

  incrementQuantity(item: any) {
    try {
      let cart = this.getCart();
      const idx = cart.findIndex(i => i.ISBN === item.ISBN);
      if (idx > -1) {
        cart[idx].quantity += 1;
        this.setCart(cart);
        this.snackBar.open(`Increased quantity of ${item.title}`, 'Close', { duration: 1500 });
      }
    } catch (error) {
      console.error('Error incrementing quantity:', error);
      this.snackBar.open('Error updating quantity', 'Close', { duration: 3000 });
    }
  }

  decrementQuantity(item: any) {
    try {
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
    } catch (error) {
      console.error('Error decrementing quantity:', error);
      this.snackBar.open('Error updating quantity', 'Close', { duration: 3000 });
    }
  }

  getTotalItems(): number {
    try {
      return this.cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
    } catch (error) {
      console.error('Error calculating total items:', error);
      return 0;
    }
  }

  // Debug method to check cart state
  debugCart() {
    console.log('Current cart items:', this.cartItems);
    console.log('Cart from service:', this.cartService.getCart());
    console.log('Total items:', this.getTotalItems());
  }
}
