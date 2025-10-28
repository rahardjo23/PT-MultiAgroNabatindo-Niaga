# Panduan Deploy ke Netlify

## Optimasi Terbaru

Project ini telah dioptimasi untuk performa maksimal:
- Gambar dikompres 75-80% (13.3 MB → 3.1 MB)
- WebP format untuk browser modern (90-97% lebih kecil)
- Code splitting & minification otomatis
- Build size total berkurang ~10 MB

Lihat detail lengkap di [OPTIMIZATION.md](OPTIMIZATION.md)

---

## Langkah-langkah Deploy:

### 1. Push ke GitHub
Pastikan semua perubahan sudah di-commit dan push ke GitHub:
```bash
git add .
git commit -m "Add Netlify Functions for AI chatbot"
git push origin main
```

### 2. Setup Environment Variables di Netlify ⚠️ PENTING!

**Ini adalah langkah WAJIB agar chatbot berfungsi!**

Setelah deploy, Anda harus menambahkan API key di Netlify:

1. Login ke **Netlify Dashboard**: https://app.netlify.com
2. Pilih site Anda
3. Klik **"Site configuration"** atau **"Site settings"**
4. Di sidebar sebelah kiri, cari dan klik **"Environment variables"**
5. Klik tombol **"Add a variable"** atau **"Add environment variable"**
6. Tambahkan variable baru:
   - **Key:** `GEMINI_API_KEY` (harus persis seperti ini, case-sensitive!)
   - **Value:** `AIzaSyAGl8eGPI6_BWtdfTvRyyRiA59RcIeT4t8`
   - **Scopes:** Pilih "All scopes" atau centang "Functions"
7. Klik **"Save"**
8. **PENTING:** Setelah menyimpan environment variable, Anda HARUS redeploy!

### 3. Deploy atau Redeploy

**Setelah menambahkan Environment Variable, WAJIB redeploy!**

#### Cara Redeploy:

**Opsi 1: Auto Deploy (Rekomendasi)**
1. Push code baru ke GitHub
2. Netlify akan otomatis rebuild dan deploy
3. Tunggu proses build selesai (biasanya 1-3 menit)

**Opsi 2: Manual Redeploy**
1. Di Netlify Dashboard, klik tab **"Deploys"**
2. Klik tombol **"Trigger deploy"**
3. Pilih **"Deploy site"**
4. Tunggu hingga status berubah menjadi "Published"

**Opsi 3: Clear Cache & Redeploy (Jika masih error)**
1. Di Netlify Dashboard, klik tab **"Deploys"**
2. Klik tombol **"Trigger deploy"**
3. Pilih **"Clear cache and deploy site"**
4. Tunggu hingga selesai

### 4. Test Chatbot

Setelah deploy selesai:
1. Buka website Anda di URL Netlify (misalnya: https://your-site.netlify.app)
2. Klik tombol chat di pojok kanan bawah
3. Test dengan mengirim pesan
4. Chatbot sekarang bisa diakses dari device manapun!

## Troubleshooting

### ❌ Chatbot Error: "I apologize, but I'm having trouble connecting..."

**Penyebab paling umum:**

1. **Environment Variable belum di-set di Netlify**
   - ✅ Fix: Ikuti langkah 2 di atas dengan teliti
   - ⚠️ Key harus persis: `GEMINI_API_KEY` (case-sensitive!)
   - ⚠️ Setelah save, WAJIB redeploy!

2. **Netlify Functions belum ter-deploy**
   - ✅ Fix: Clear cache dan redeploy (Opsi 3 di atas)
   - Cek di Netlify Dashboard > Functions
   - Harus ada function bernama "chat"

3. **Environment Variable scope salah**
   - ✅ Fix: Edit variable di Netlify
   - Pastikan scope "Functions" tercentang
   - Save dan redeploy

### 🔍 Cara Debug Lebih Lanjut:

**Step 1: Cek Environment Variable**
1. Buka Netlify Dashboard > Site configuration > Environment variables
2. Pastikan `GEMINI_API_KEY` ada di list
3. Pastikan Value terisi (tidak kosong)
4. Pastikan Scope "Functions" aktif

**Step 2: Cek Function Logs**
1. Buka Netlify Dashboard > Functions
2. Klik function "chat"
3. Lihat "Recent logs"
4. Cari error message yang spesifik

**Step 3: Cek Browser Console**
1. Buka website Anda
2. Tekan F12 (Developer Tools)
3. Klik tab "Console"
4. Coba kirim pesan di chatbot
5. Lihat error message yang muncul

**Step 4: Test API Key**
1. Buka: https://aistudio.google.com/apikey
2. Pastikan API key Anda valid dan aktif
3. Cek quota belum habis

### Chatbot masih error setelah semua langkah di atas?
Cek hal berikut:

1. **Build berhasil?**
   - Cek Netlify Dashboard > Deploys
   - Status harus "Published" (hijau)
   - Bukan "Failed" (merah)

2. **Function ter-deploy?**
   - Cek Netlify Dashboard > Functions
   - Harus ada function "chat"
   - Status "Active"

3. **Redeploy setelah set environment variable?**
   - Environment variable baru akan aktif SETELAH redeploy
   - Jika belum redeploy, lakukan sekarang!

### API Key tidak bekerja?
1. Pastikan API key valid dan aktif
2. Cek quota API di Google AI Studio: https://aistudio.google.com
3. Pastikan environment variable name persis: `GEMINI_API_KEY`
4. Pastikan tidak ada spasi di depan/belakang API key

## File Structure
```
ptman/
├── netlify/
│   └── functions/
│       └── chat.js          # Backend API sebagai Netlify Function
├── netlify.toml             # Konfigurasi Netlify
├── src/
│   └── ChatWidget.jsx       # Frontend (sudah update API endpoint)
└── .env                     # Local development (JANGAN di-push ke GitHub!)
```

## Catatan Penting
- File `.env` JANGAN di-commit ke GitHub (sudah ada di .gitignore)
- API key harus disimpan di Netlify Environment Variables
- Netlify Functions gratis untuk 125,000 requests/month
- Jika traffic tinggi, pertimbangkan upgrade plan
