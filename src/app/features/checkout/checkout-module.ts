import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Checkout } from './checkout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: Checkout },
  { path: 'order-success', loadComponent: () => import('./order-success').then(m => m.OrderSuccess) }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    Checkout
  ]
})
export class CheckoutModule { }
