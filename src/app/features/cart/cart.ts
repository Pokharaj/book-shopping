import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  cartItems = [
    { id: 1, title: 'Angular for Beginners', quantity: 1 },
    { id: 2, title: 'Advanced Angular', quantity: 2 }
  ];

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }
}
