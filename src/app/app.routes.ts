import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/book-list/book-list-module').then(m => m.BookListModule)
  },
  {
    path: 'book/:ISBN',
    loadChildren: () => import('./features/book-details/book-details-module').then(m => m.BookDetailsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart-module').then(m => m.CartModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/checkout/checkout-module').then(m => m.CheckoutModule)
  },
  {
    path: 'order-success',
    loadComponent: () => import('./features/checkout/order-success').then(m => m.OrderSuccess)
  }
];
