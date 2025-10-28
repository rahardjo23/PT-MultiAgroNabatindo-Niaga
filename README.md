# PT. Multi Agronabatindo Niaga - Company Profile Website

Company profile website untuk PT. Multi Agronabatindo Niaga, perusahaan trading kelapa sawit yang berdiri sejak 1990.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open: **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output akan ada di folder `dist/`

---

## 📧 Email Setup (Required!)

Contact form menggunakan **EmailJS**. Setup dulu sebelum deploy:

1. Buat account di: https://www.emailjs.com/
2. Setup service (Gmail recommended)
3. Create email template
4. Copy Service ID, Template ID, dan Public Key
5. Edit `src/App.jsx` (line 35-37) dengan credentials Anda

**Panduan lengkap:** Lihat [EMAILJS_SETUP.md](EMAILJS_SETUP.md)

---

## 🌐 Deploy

### Vercel (Recommended)

```bash
npm install -g vercel
vercel deploy --prod
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

Atau drag & drop folder `dist/` ke dashboard Vercel/Netlify.

**Note:** EmailJS sudah dikonfigurasi, langsung berfungsi setelah deploy! ✅

---

## 📁 Project Structure

```
ptman/
├── src/
│   ├── App.jsx          # Main React component
│   ├── index.css        # Tailwind CSS
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── EMAILJS_SETUP.md     # Email setup guide
└── README.md            # This file
```

---

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **EmailJS** - Email service (no backend needed!)
- **Lucide React** - Icons

---

## ✨ Features

- ✅ Responsive design (mobile-friendly)
- ✅ Smooth scrolling navigation
- ✅ Contact form with email integration
- ✅ Company information & background
- ✅ Vision & Mission
- ✅ Directors information
- ✅ Business activities
- ✅ Product showcase
- ✅ Gallery section
- ✅ Google Maps integration
- ✅ Company legality information

---

## 📞 Support

Jika ada masalah dengan setup EmailJS, lihat [EMAILJS_SETUP.md](EMAILJS_SETUP.md) atau troubleshooting section di file tersebut.
