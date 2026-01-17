import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class AppComponent implements OnInit {
 
  customers: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/customers')
      .subscribe({
        next: (data) => {
          this.customers = data;
          console.log('Veri geldi:', data);
        },
        error: (err) => {
          console.error('Hata:', err);
        }
      });
  }
}