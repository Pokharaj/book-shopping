import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatListModule, MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems = this.cartService.getCart();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price?.amount || 0) * item.quantity, 0);
  }

  placeOrder() {
    this.cartService.setCart([]); // Clear the cart
    this.router.navigate(['/order-success']);
  }
}
