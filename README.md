# MERN Stack Boilerplate Template

Template ini dibuat untuk mempercepat inisialisasi proyek **MERN (MongoDB, Express, React, Node.js)** dalam skala pengembangan yang lebih serius (multi-app, terstruktur, dan siap dikembangkan tim).

## Tech Stack

### Backend (`apps/backend`)
- Node.js + Express 5
- TypeScript
- MongoDB + Mongoose
- Logging dengan Pino + pino-http
- Security middleware: `helmet`, `cors`

### Frontend (`apps/frontend`)
- React 19
- TanStack Start + TanStack Router + TanStack Query
- Axios
- Vite
- TypeScript
- Tailwind CSS 4

### Workspace
- Monorepo dengan `pnpm workspace`

## Struktur Proyek

```txt
mern-stack-boilerplate/
├─ apps/
│  ├─ backend/      # REST API + koneksi MongoDB
│  └─ frontend/     # UI React + routing
├─ package.json     # script orchestrator (root)
└─ pnpm-workspace.yaml
```

## Prasyarat

Pastikan environment lokal sudah memiliki:
- Node.js 20+
- pnpm 10+
- MongoDB (lokal/atlas)

## Instalasi

```bash
pnpm install
```

## Konfigurasi Environment

Buat file `.env` di `apps/backend/.env`:

```env
PORT=5000
DATABASE_URI=mongodb://127.0.0.1:27017/mern_template
NODE_ENV=development
LOG_LEVEL=info
```

> `DATABASE_URI` wajib diisi agar backend bisa terkoneksi ke MongoDB.

## Menjalankan Development

Dari root project:

```bash
pnpm dev
```

Perintah ini akan menjalankan:
- Frontend: `http://localhost:3000`
- Backend: sesuai `PORT` pada `.env` (contoh: `http://localhost:5000`)

## Endpoint Dasar Backend

- `GET /health` → cek status service backend
- `GET /` → endpoint sambutan sederhana

Contoh:

```bash
curl http://localhost:5000/health
```

## Script Penting

Dari root project:

```bash
pnpm dev      # menjalankan frontend + backend bersamaan
pnpm build    # build semua app dalam workspace
pnpm test     # jalankan test semua app
pnpm lint     # lint semua app (jika script lint tersedia)
```

## Rekomendasi Penggunaan untuk Skala Proyek

- Pisahkan domain/fitur backend ke folder `modules` atau `features` agar maintainable.
- Tambahkan validasi request (misal Zod/Joi) sebelum controller.
- Gunakan `.env` per environment (dev/staging/prod).
- Tambahkan layer auth (JWT/session) dan RBAC bila dibutuhkan.
- Integrasikan CI/CD (test + build) sebelum merge.
- Tambahkan observability (metrics/tracing) saat traffic mulai meningkat.

## Next Step yang Disarankan

1. Buat model `User` + auth flow (register/login).
2. Tambahkan API versioning (`/api/v1`).
3. Integrasikan frontend ke backend melalui service layer/fetch client.
4. Tambahkan testing:
   - Backend: unit + integration test
   - Frontend: component + e2e test

---

Kalau kamu mau, saya juga bisa lanjut bantu bikin:
- struktur folder backend siap production (`controllers/services/repositories`),
- boilerplate auth JWT,
- dan template CRUD end-to-end (frontend + backend + MongoDB).
