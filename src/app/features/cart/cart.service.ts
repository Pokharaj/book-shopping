import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  private readonly CART_KEY = 'bookstore_cart';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.updateCartCount();
  }

  getCart(): any[] {
    try {
      // Try localStorage first (better for mobile)
      if (this.isLocalStorageAvailable()) {
        const stored = localStorage.getItem(this.CART_KEY);
        if (stored) {
          const cart = JSON.parse(stored);
          console.log('Cart loaded from localStorage:', cart);
          return Array.isArray(cart) ? cart : [];
        }
      }

      // Fallback to cookies
      const match = this.document.cookie.match(new RegExp('(^| )cart=([^;]+)'));
      if (match) {
        const cart = JSON.parse(decodeURIComponent(match[2]));
        console.log('Cart loaded from cookies:', cart);
        return Array.isArray(cart) ? cart : [];
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
    
    return [];
  }

  setCart(cart: any[]) {
    try {
      // Validate cart data
      if (!Array.isArray(cart)) {
        console.error('Invalid cart data:', cart);
        return;
      }

      // Try localStorage first
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
      }

      // Also save to cookies as backup
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
      this.document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; expires=${expires}; path=/; SameSite=Lax`;
      
      this.updateCartCount();
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  updateCartCount() {
    try {
      const cart = this.getCart();
      const count = cart.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
      this.cartCountSubject.next(count);
      console.log('Cart count updated:', count);
    } catch (error) {
      console.error('Error updating cart count:', error);
      this.cartCountSubject.next(0);
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Method to clear cart (useful for debugging)
  clearCart() {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.removeItem(this.CART_KEY);
      }
      
      // Clear cookie
      this.document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      this.updateCartCount();
      console.log('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  // Method to get cart debug info
  getCartDebugInfo() {
    const localStorageAvailable = this.isLocalStorageAvailable();
    const localStorageData = localStorageAvailable ? localStorage.getItem(this.CART_KEY) : 'Not available';
    const cookieData = this.document.cookie.match(new RegExp('(^| )cart=([^;]+)'))?.[2] || 'Not found';
    
    return {
      localStorageAvailable,
      localStorageData,
      cookieData,
      currentCart: this.getCart(),
      cartCount: this.cartCountSubject.value
    };
  }
} 