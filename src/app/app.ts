import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CartService } from './features/cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatIconModule, MatBadgeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('book-shopping');
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  onLogoLoad(event: any) {
    // Add loaded class for smooth animation
    const img = event.target;
    img.classList.add('loaded');
  }

  onLogoError(event: any) {
    // Hide the logo and show fallback icon
    const img = event.target;
    const fallback = img.nextElementSibling;
    if (img && fallback) {
      img.style.display = 'none';
      fallback.style.display = 'flex';
    }
    
    // Log the error for debugging
    console.warn('Logo failed to load:', img.src);
  }
}
