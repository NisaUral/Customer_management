# Customer Management System

Yöneticilerin müşteri kayıtlarını yönetebildiği bir CRM (müşteri ilişkileri yönetimi) uygulaması.

## Problem

İşletmelerin müşteri bilgilerini düzenli, aranabilir ve yönetilebilir bir şekilde tutması gerekir. Bu proje, bir yönetici için müşteri kayıtlarını ekleme, güncelleme, listeleme ve yönetme işlevlerini sağlayan bir sistem sunuyor.

## Yaklaşım

- **Backend (`customer-backend/`):** **Java + Spring Boot** ile REST API
- **Veritabanı:** **PostgreSQL**
- **Frontend (`customer-frontend/`):** **Angular 17** ile geliştirilen yönetici paneli

## Teknolojiler

Java, Spring Boot, PostgreSQL, Angular 17

## Kurulum

**Backend:**
```bash
cd customer-backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd customer-frontend
npm install
ng serve
```
