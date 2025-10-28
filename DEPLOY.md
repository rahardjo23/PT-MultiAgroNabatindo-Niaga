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

### 2. Setup Environment Variables di Netlify

Setelah deploy, Anda harus menambahkan API key di Netlify:

1. Login ke Netlify Dashboard: https://app.netlify.com
2. Pilih site Anda
3. Klik "Site settings"
4. Klik "Environment variables" di sidebar
5. Tambahkan variable baru:
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSyAGl8eGPI6_BWtdfTvRyyRiA59RcIeT4t8` (atau API key Anda)
6. Klik "Save"

### 3. Deploy atau Redeploy

Jika Anda sudah push ke GitHub dan Netlify terhubung ke repository Anda:
- Netlify akan otomatis rebuild dan deploy
- Tunggu proses build selesai (biasanya 1-3 menit)

Atau Anda bisa manual redeploy:
1. Klik "Deploys" tab
2. Klik "Trigger deploy" > "Deploy site"

### 4. Test Chatbot

Setelah deploy selesai:
1. Buka website Anda di URL Netlify (misalnya: https://your-site.netlify.app)
2. Klik tombol chat di pojok kanan bawah
3. Test dengan mengirim pesan
4. Chatbot sekarang bisa diakses dari device manapun!

## Troubleshooting

### Chatbot masih error?
1. Cek environment variables sudah benar di Netlify
2. Cek browser console untuk error messages (F12 > Console)
3. Cek Netlify Function logs di Dashboard > Functions

### API Key tidak bekerja?
1. Pastikan API key valid dan aktif
2. Cek quota API di Google AI Studio: https://makersuite.google.com
3. Pastikan environment variable name persis: `GEMINI_API_KEY`

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
