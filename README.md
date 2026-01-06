# Todo Management App (Fullstack)

Aplikasi **Todo Management** berbasis **React + Vite + Tailwind CSS v3 + Ant Design** di frontend, dan **NestJS + Prisma + PostgreSQL** di backend.  
Project ini siap dijalankan **lokal** maupun **dengan Docker**.

---

## 🔹 Teknologi yang Digunakan

- **Frontend**: React.js, Vite, Tailwind CSS v3, Ant Design
- **Backend**: NestJS, Prisma, PostgreSQL
- **Containerization**: Docker & Docker Compose
- **Validasi & Auth**: DTO + class-validator, header `x-user-id` sederhana
- **Notifikasi**: Toast untuk aksi sukses/gagal di FE

---

## 🔹 Versi Node & NPM

- Node.js v20
- npm terbaru (sesuaikan versi Node)

---

## 🔹 Menjalankan Aplikasi

### A. Tanpa Docker

**Backend:**
cd todo-backend
npm install
npm run start:dev

# Server berjalan di http://localhost:3000

**Frontend:**
cd todo-frontend
npm install
npm run dev

# Frontend berjalan di http://localhost:5173

### B. Dengan Docker

docker-compose up --build

# Backend: http://localhost:3000/api

# Frontend: http://localhost:5173

# Database: PostgreSQL port 5432

---

## 🔹 Cara Menggunakan Aplikasi

- **Tambah Todo**: Masukkan judul di input "Tambah todo baru" → klik Add
- **Search / Filter**: Input di "Search todo..." → otomatis filter daftar
- **Edit Todo**: Klik ikon edit → muncul modal → ubah judul → save
- **Hapus Todo**: Klik ikon delete → muncul konfirmasi → hapus
- **Toggle Completed**: Klik checkbox → menandai selesai/belum
- **Error / Loading**: Notifikasi toast muncul untuk feedback aksi

# **Semua request FE dikirim dengan header x-user-id → backend menolak jika kosong (401 Unauthorized)**

---

## 🔹 Keputusan Teknis

- **Auth ringan**: Menggunakan header x-user-id di setiap request → simulasi user auth.
- **Dockerization**: FE & BE masing-masing memiliki Dockerfile, docker-compose untuk menjalankan fullstack sekaligus.
- **Frontend structure**: API logic dipisah ke custom hooks, UI memakai Tailwind + Ant Design → mudah maintain & reusable.
- **Backend structure**: NestJS modular + DTO + class-validator → validasi input aman dan konsisten.
- **UX**: Loading, error, dan toast notification agar user tahu status aksi realtime.

---

## 🔹 Screen Shots FE :
