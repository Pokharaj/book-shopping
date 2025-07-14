import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, CommonModule, HttpClientModule, MatExpansionModule, MatIconModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss'
})
export class BookDetails implements OnInit {
  book: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const ISBN = this.route.snapshot.paramMap.get('ISBN');
    this.http.get<any[]>('/book_data.json').subscribe(books => {
      this.book = books.find(b => b.ISBN === ISBN);
    });
  }

  addToCart(book: any) {
    // Placeholder for cart logic
    alert(`${book.title} added to cart!`);
  }
}
