import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  newCustomer: any = { ad: "", soyad: "", email: "", meslek: "" };
  editingCustomerId: number | null = null;
  

  searchText: string = "";
  showForm: boolean = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllCustomers();
  }

 
  get filteredCustomers() {
    if (!this.searchText) return this.customers;
    return this.customers.filter(c => 
      c.ad.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.soyad.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.meslek.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getAllCustomers() {
    this.http.get<any[]>('http://localhost:8080/api/customers')
      .subscribe({
        next: (data) => {
          this.customers = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
  }

  // Formu Aç/Kapat
  toggleForm(show: boolean) {
    this.showForm = show;
    if (!show) this.resetForm();
  }

  saveOrUpdate() {
    if (!this.newCustomer.ad || !this.newCustomer.soyad) {
      alert("Lütfen Ad ve Soyad alanlarını doldurun! ");
      return;
    }
    this.editingCustomerId ? this.updateCustomer() : this.createCustomer();
  }

  createCustomer() {
    this.http.post('http://localhost:8080/api/customers', this.newCustomer)
      .subscribe({
        next: () => {
          this.getAllCustomers();
          this.toggleForm(false); // Kayıttan sonra formu kapat
          alert("Kayıt Başarılı! ");
        }
      });
  }

  updateCustomer() {
    this.http.put(`http://localhost:8080/api/customers/${this.editingCustomerId}`, this.newCustomer)
      .subscribe({
        next: () => {
          this.getAllCustomers();
          this.toggleForm(false);
          alert("Güncelleme Başarılı! ");
        }
      });
  }

  deleteCustomer(id: number) {
    if(confirm("Silmek istediğine emin misin?")) {
      this.http.delete(`http://localhost:8080/api/customers/${id}`)
        .subscribe({
          next: () => {
            this.getAllCustomers();
            alert("Silindi! ");
          }
        });
    }
  }

  editMode(customer: any) {
    this.editingCustomerId = customer.id;
    this.newCustomer = { ...customer };
    this.showForm = true; // Düzenle deyince formu aç
  }

  resetForm() {
    this.newCustomer = { ad: "", soyad: "", email: "", meslek: "" };
    this.editingCustomerId = null;
  }
}