
## Authors

- Yudha Kurnia Pratama 120140241

# Weather Dashboard

Aplikasi ini adalah dasbor cuaca sederhana yang dibuat menggunakan React.js. Pengguna dapat memprediksi cuaca di kota mana pun di seluruh dunia dan mendapatkan informasi cuaca saat ini serta prakiraan 5 hari ke depan yang mengambil data live dari OpenWeatherMap API.

## Fitur Utama

- Pencarian Kota: Form input dengan fitur autocomplete suggestion menggunakan Geocoding API.
- Cuaca Saat Ini: Menampilkan detail cuaca (suhu, kelembapan, kecepatan angin, dan ikon cuaca).
- Prediksi Cuaca: Menampilkan data prakiraan cuaca dalam 5 hari dalam format tabel.
- Riwayat Pencarian: Menyimpan 5 pencarian terakhir di localStorage untuk akses cepat.
- Toggle Unit: Mengubah semua satuan suhu antara Celsius (°C) dan Fahrenheit (°F).

## Link Deployment Vercel

[Weather Dashboard](https://uts-pemweb-120140241.vercel.app/)

## Screenshot Aplikasi

![App Screenshot](https://github.com/yudharniata/uts-pemweb-120140241/blob/main/public/pic_dashboard.png?raw=true)

## Teknologi yang Digunakan

- Frontend: React.js (via Create React App)

- Styling: Tailwind CSS

- State Management: React Hooks (useState, useEffect)

- HTTP Client: Fetch API (Async/Await)

- API: OpenWeatherMap (Current Weather, 5 Day Forecast, Geocoding)

- Deployment: Verce

## Cara Instalasi dan Menjalankan (Lokal)

Clone project ini

```bash
  git clone https://github.com/yudharniata/uts-pemweb-120140241.git
```

Masuk ke direktori project

```bash
  cd my-app
```

Install semua dependencies

```bash
  npm install
```

Buat file ``.env.local``
Buat file baru bernama ``.env.local`` di dalam folder utama (``my-app/``) dan tambahkan API Key Anda:

```bash
  REACT_APP_OPENWEATHER_API_KEY=API_KEY_ANDA_DARI_OPENWEATHERMAP
```

Jalankan aplikasi

```bash
  npm start
```

Aplikasi akan otomatis terbuka di <http://localhost:3000>.
