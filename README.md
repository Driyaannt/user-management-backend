# Employee Management System (Backend)

Backend untuk aplikasi manajemen karyawan menggunakan **Node.js**, **Express**, dan **PostgreSQL**, mengikuti prinsip *Clean Architecture*.

## 🚀 Getting Started

Ikuti langkah-langkah berikut untuk menjalankan backend secara lokal.

### ⚙️ Prasyarat

- Node.js dan npm sudah terinstal
- PostgreSQL aktif dan sudah dibuat database-nya

### 📦 Instalasi

1. **Clone repository ini** (jika belum):
   ```bash
   git clone https://github.com/your-username/your-backend-repo.git
   cd your-backend-repo

2. **Instal dependensi**:
   ```bash
   npm install
   ```
3. **Buat file konfigurasi**:
   - Salin file `.env.example` menjadi `.env` dan sesuaikan dengan konfigurasi database Anda.
   ```bash
   cp .env.example .env
   ```
4. **Jalankan migrasi database**:
   ```bash
   npm run migrate
   ```
5. **Jalankan seedernya**:
   ```bash
   npm run seed
   ```
6. **Jalankan server**:
   ```bash
   npm start
   ```