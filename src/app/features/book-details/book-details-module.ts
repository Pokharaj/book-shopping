import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookDetails } from './book-details';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  { path: '', component: BookDetails }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    BookDetails
  ]
})
export class BookDetailsModule { }
