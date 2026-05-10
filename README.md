# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Admin Panel Security

Admin panel sekarang diproteksi dengan kombinasi:
- Jalur akses tersembunyi: `/akses-admin`
- Access key admin (server-side)
- Sesi admin berbasis cookie httpOnly
- (Opsional) whitelist fingerprint perangkat tertentu

Set environment variables berikut:

- `ADMIN_ACCESS_KEY`  
  Kunci rahasia untuk login dari halaman `/akses-admin`.
- `ADMIN_SESSION_SECRET`  
  Secret untuk menandatangani sesi admin.
- `ADMIN_ALLOWED_DEVICE_FINGERPRINTS` (opsional)  
  Daftar fingerprint perangkat yang diizinkan, dipisah koma. Jika kosong, fitur whitelist perangkat dinonaktifkan.
- `ADMIN_PANEL_PATH` (opsional, default `/admin`)  
  Path panel admin yang dikembalikan setelah login sukses.
- `ADMIN_ENTRY_PATH` (opsional, default `/akses-admin`)  
  Nama path akses admin tersembunyi (dipakai di helper dan konfigurasi).

### Cara mendapatkan fingerprint perangkat

Fingerprint dibentuk dari hash `user-agent` + `accept-language` request.  
Jika ingin mode “hanya perangkat tertentu”, isi `ADMIN_ALLOWED_DEVICE_FINGERPRINTS` dengan fingerprint perangkat admin.
