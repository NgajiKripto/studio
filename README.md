# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Menjalankan secara local

1. Install dependency:
   - `npm install`
2. Buat env file local:
   - `cp .env.example .env.local`
3. Isi minimal environment variable:
   - `DATABASE_URL` (PostgreSQL)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL=http://localhost:9002`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
4. Jalankan aplikasi:
   - `npm run dev`

Catatan:
- Dev server berjalan di `http://localhost:9002`.
- Jika `DATABASE_URL` belum diisi, halaman utama tetap bisa dibuka untuk pengecekan UI dasar.

## Admin Panel Security

Admin panel sekarang diproteksi dengan kombinasi:
- Jalur akses tersembunyi: `/akses-admin`
- Access key admin (server-side)
- Sesi admin berbasis cookie httpOnly (default 8 jam, bisa diatur via env)
- (Opsional) whitelist fingerprint perangkat tertentu

Set environment variables berikut:

- `ADMIN_ACCESS_KEY`  
  Kunci rahasia untuk login dari halaman `/akses-admin`.
- `ADMIN_SESSION_SECRET`  
  Secret untuk menandatangani sesi admin.
- `ADMIN_ALLOWED_DEVICE_FINGERPRINTS` (opsional)  
  Daftar fingerprint perangkat yang diizinkan, dipisah koma. Jika kosong, fitur whitelist perangkat dinonaktifkan.
- `ADMIN_ALLOWED_IPS` (opsional)  
  Daftar IP yang diizinkan untuk akses admin, dipisah koma.
- `ADMIN_SESSION_MAX_AGE_SECONDS` (opsional, default `28800`)  
  Durasi sesi admin dalam detik.
- `ADMIN_STRICT_DEVICE_FINGERPRINT` (opsional, default `false`)  
  Jika `true`, fingerprint memakai gabungan `user-agent + accept-language`.
- `ADMIN_PANEL_PATH` (opsional, default `/admin`)  
  Path panel admin yang dikembalikan setelah login sukses.
- `ADMIN_ENTRY_PATH` (opsional, default `/akses-admin`)  
  Nama path akses admin tersembunyi (dipakai di helper dan konfigurasi).

### Cara mendapatkan fingerprint perangkat

Secara default fingerprint dibentuk dari hash `user-agent`.  
Jika `ADMIN_STRICT_DEVICE_FINGERPRINT=true`, fingerprint memakai hash `user-agent + accept-language`.  

> Catatan: Fingerprint berbasis header (termasuk `user-agent`) punya keterbatasan karena header bisa dipalsukan. Untuk keamanan lebih tinggi, kombinasikan dengan rotasi `ADMIN_ACCESS_KEY` berkala, `ADMIN_ALLOWED_IPS`, dan pembatasan jaringan/proxy tepercaya.
Jika ingin mode “hanya perangkat tertentu”, isi `ADMIN_ALLOWED_DEVICE_FINGERPRINTS` dengan fingerprint perangkat admin.
