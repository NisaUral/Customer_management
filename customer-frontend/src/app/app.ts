import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  
  customers: any[] = []; 
  
  // Formdaki verileri tutan nesne
  newCustomer: any = { ad: "", soyad: "", email: "", meslek: "" };

  // Hangi müşteriyi düzenliyoruz? (Boşsa yeni kayıt demektir)
  editingCustomerId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllCustomers();
  }

  // 1. GET - Listeleme
  getAllCustomers() {
    this.http.get<any[]>('http://localhost:8080/api/customers')
      .subscribe({
        next: (data) => this.customers = data,
        error: (err) => console.error('Hata:', err)
      });
  }

  // 2. POST veya PUT (Karar Verici Fonksiyon)
  saveOrUpdate() {
    // Eğer bir ID varsa GÜNCELLEME yap
    if (this.editingCustomerId) {
      this.updateCustomer();
    } else {
      // ID yoksa YENİ KAYIT yap
      this.createCustomer();
    }
  }

  // YENİ KAYIT (POST)
  createCustomer() {
    this.http.post('http://localhost:8080/api/customers', this.newCustomer)
      .subscribe({
        next: (res) => {
          this.getAllCustomers();
          this.resetForm(); // Formu temizle
        },
        error: (err) => console.error("Kayıt hatası:", err)
      });
  }

  // GÜNCELLEME (PUT) <-- Backend'deki @PutMapping çalışacak
  updateCustomer() {
    this.http.put(`http://localhost:8080/api/customers/${this.editingCustomerId}`, this.newCustomer)
      .subscribe({
        next: (res) => {
          console.log("Güncelleme Başarılı");
          this.getAllCustomers();
          this.resetForm(); // İş bitince formu temizle ve normale dön
        },
        error: (err) => console.error("Güncelleme hatası:", err)
      });
  }

  // 3. DELETE - Silme
  deleteCustomer(id: number) {
    if(confirm("Bu müşteriyi silmek istediğine emin misin?")) {
      this.http.delete(`http://localhost:8080/api/customers/${id}`)
        .subscribe({
          next: () => this.getAllCustomers(),
          error: (err) => console.error("Silme hatası:", err)
        });
    }
  }

 
  editMode(customer: any) {
    this.editingCustomerId = customer.id; 
   
    this.newCustomer = { ...customer }; 
  }


  resetForm() {
    this.newCustomer = { ad: "", soyad: "", email: "", meslek: "" };
    this.editingCustomerId = null;
  }
}