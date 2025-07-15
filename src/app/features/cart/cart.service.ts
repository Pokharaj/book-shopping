import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.updateCartCount();
  }

  getCart(): any[] {
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

  setCart(cart: any[]) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    this.document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; expires=${expires}; path=/`;
    this.updateCartCount();
  }

  updateCartCount() {
    const cart = this.getCart();
    const count = cart.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
    this.cartCountSubject.next(count);
  }
} 