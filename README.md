<img width="1440" height="722" alt="Screenshot 2026-01-06 at 17 06 57" src="https://github.com/user-attachments/assets/7474aea9-b65c-429a-b4a1-de2b0c05fa2a" />

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
- cd todo-backend
- npm install
- npx prisma generate
- npx prisma migrate dev
- npm run start:dev
  
Server berjalan di http://localhost:3000

**Frontend:**
- cd todo-frontend
- npm install
- npm run dev
  
Frontend berjalan di http://localhost:5173

### B. Dengan Docker

docker-compose up --build

- Backend: http://localhost:3000/api
- Frontend: http://localhost:5173
- Database: PostgreSQL port 5432

---

## 🔹 Cara Menggunakan Aplikasi

- **Tambah Todo**: Masukkan judul di input "Tambah todo baru" → klik Add
- **Search / Filter**: Input di "Search todo..." → otomatis filter daftar
- **Edit Todo**: Klik ikon edit → muncul modal → ubah judul → save
- **Hapus Todo**: Klik ikon delete → muncul konfirmasi → hapus
- **Toggle Completed**: Klik checkbox → menandai selesai/belum
- **Error / Loading**: Notifikasi toast muncul untuk feedback aksi

**Semua request FE dikirim dengan header x-user-id → backend menolak jika kosong (401 Unauthorized)**

---

## 🔹 Keputusan Teknis

- **Auth ringan**: Menggunakan header x-user-id di setiap request → simulasi user auth.
- **Dockerization**: FE & BE masing-masing memiliki Dockerfile, docker-compose untuk menjalankan fullstack sekaligus.
- **Frontend structure**: API logic dipisah ke custom hooks, UI memakai Tailwind + Ant Design → mudah maintain & reusable.
- **Backend structure**: NestJS modular + DTO + class-validator → validasi input aman dan konsisten.
- **UX**: Loading, error, dan toast notification agar user tahu status aksi realtime.

---

## 🔹 Screen Shots FE :
1. Home page :
   <img width="1440" height="722" alt="Screenshot 2026-01-06 at 17 06 57" src="https://github.com/user-attachments/assets/7474aea9-b65c-429a-b4a1-de2b0c05fa2a" />

2. Create Todos :
   <img width="1440" height="722" alt="Screenshot 2026-01-06 at 17 07 23" src="https://github.com/user-attachments/assets/3b920d1b-4856-4661-9cff-9d860b042d7c" />
   (Success)
   <img width="1440" height="722" alt="Screenshot 2026-01-06 at 17 07 39" src="https://github.com/user-attachments/assets/26939948-9518-4234-aac4-7d4be338de2a" />

3. Update Todos :
   <img width="1440" height="722" alt="Screenshot 2026-01-06 at 17 08 00" src="https://github.com/user-attachments/assets/c4473898-8a7d-42da-a119-f1617646da39" />
   (Success)
   <img width="1440" height="722" alt="Screenshot 2026-01-06 at 17 43 48" src="https://github.com/user-attachments/assets/22c98f69-5145-422c-90e7-738bc3b9aefa" />
  
5. Delete Todos :
   <img width="1440" height="722" alt="Screenshot 2026-01-06 at 17 08 11" src="https://github.com/user-attachments/assets/cdaa27e1-09c4-4338-ad41-c57054fb2177" />
   (Success)
   <img width="1440" height="722" alt="Screenshot 2026-01-06 at 17 43 59" src="https://github.com/user-attachments/assets/248d68a6-870f-48e9-87af-1a483f84a91f" />

6. Confirm :
   <img width="1440" height="722" alt="Screenshot 2026-01-06 at 19 55 37" src="https://github.com/user-attachments/assets/4de9f348-f40d-4b98-905d-2a1606f07411" />
 

