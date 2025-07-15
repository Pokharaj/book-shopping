import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.updateCartCount();
  }

  updateCartCount() {
    const match = this.document.cookie.match(new RegExp('(^| )cart=([^;]+)'));
    if (match) {
      try {
        const cart = JSON.parse(decodeURIComponent(match[2]));
        this.cartCount = cart.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
      } catch {
        this.cartCount = 0;
      }
    } else {
      this.cartCount = 0;
    }
  }
}
