# 📧 EmailJS Setup Guide - PT. Multi Agronabatindo Niaga

## Setup EmailJS (5-10 menit)

### 1️⃣ Buat Account EmailJS

1. Buka: https://www.emailjs.com/
2. Klik **"Sign Up Free"**
3. Daftar dengan Google atau Email
4. Verify email Anda

---

### 2️⃣ Add Email Service

1. Di dashboard, klik **"Email Services"**
2. Klik **"Add New Service"**
3. Pilih **"Gmail"** (atau provider lain)
4. Klik **"Connect Account"**
5. Login dengan Gmail Anda (andrewrchristopher@gmail.com)
6. Allow EmailJS access
7. **Copy Service ID** (contoh: `service_abc1234`)

---

### 3️⃣ Create Email Template

1. Klik **"Email Templates"**
2. Klik **"Create New Template"**
3. **Template Name:** `PT MAN Contact Form`
4. **Edit Template Content:**

**Subject:**
```
New Contact Form - {{from_name}}
```

**Body:**
```
New contact form submission from PT. Multi Agronabatindo Niaga website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Service Interested In: {{service}}

Message:
{{message}}

---
This email was sent from the PT. MAN website contact form.
```

5. **To Email:** `{{to_email}}` (atau langsung isi `man@multiagroniaga.com`)
6. **From Name:** `{{from_name}}`
7. **Reply To:** `{{from_email}}`
8. Klik **"Save"**
9. **Copy Template ID** (contoh: `template_xyz5678`)

---

### 4️⃣ Get Public Key

1. Klik **"Account"** (di menu kiri)
2. Scroll ke **"API Keys"**
3. **Copy Public Key** (contoh: `a1b2c3d4e5f6g7h8`)

---

### 5️⃣ Update Code

Edit file: `src/App.jsx` (baris 35-37)

```javascript
const EMAILJS_SERVICE_ID = 'service_abc1234';     // ← PASTE Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz5678';   // ← PASTE Template ID
const EMAILJS_PUBLIC_KEY = 'a1b2c3d4e5f6g7h8';    // ← PASTE Public Key
```

---

### 6️⃣ Test

1. Run development:
   ```bash
   npm run dev
   ```

2. Buka: http://localhost:5173

3. Scroll ke Contact Form

4. Isi dan submit form

5. **Check email** di `man@multiagroniaga.com` (atau email yang Anda set)

---

## 🚀 Deploy ke Vercel/Netlify

Setelah EmailJS dikonfigurasi:

```bash
# Build
npm run build

# Deploy
npm install -g vercel
vercel deploy --prod
```

Atau drag & drop folder `dist/` ke Vercel/Netlify dashboard.

**Done!** ✅ Contact form akan langsung berfungsi di production!

---

## 📊 EmailJS Limits (Free Tier)

- **200 emails/month** - gratis
- **2 email services**
- **2 email templates**

Untuk lebih: upgrade ke paid plan ($15/month = 1000 emails)

---

## ✅ Keuntungan EmailJS

✅ No backend needed (works with Vercel/Netlify)
✅ Easy setup (5-10 menit)
✅ Free tier cukup untuk most websites
✅ Dashboard untuk monitor emails
✅ Support semua email providers (Gmail, Outlook, dll)

---

## 🔧 Troubleshooting

### Form tidak kirim email
- Check Service ID, Template ID, Public Key sudah benar
- Check browser console (F12) untuk error
- Verify EmailJS dashboard shows the service is connected

### Email masuk spam
- Add sender ke contacts
- Check template format (pastikan ada proper headers)

### Limit exceeded
- Free tier = 200 emails/month
- Upgrade plan atau gunakan email service lain

---

## 📞 Support

EmailJS Docs: https://www.emailjs.com/docs/
