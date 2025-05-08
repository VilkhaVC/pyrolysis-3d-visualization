# Visualisasi 3D Proses Pirolisis Oli Bekas

Aplikasi ini menampilkan visualisasi 3D dari proses pengolahan oli bekas melalui metode pirolisis. Visualisasi ini menunjukkan seluruh rangkaian proses mulai dari tangki oli bekas hingga produk akhir berupa minyak dan gas.

## Deskripsi Proses

Pirolisis adalah proses dekomposisi termal bahan organik pada suhu tinggi tanpa kehadiran oksigen. Dalam konteks pengolahan oli bekas, pirolisis mengubah oli bekas menjadi produk yang bermanfaat seperti bahan bakar cair, gas, dan residu karbon.

Proses yang divisualisasikan meliputi:
1. **Persiapan Bahan Baku** - Oli bekas disaring dan dipersiapkan dalam tangki umpan
2. **Pemanasan** - Oli dipanaskan dalam reaktor pirolisis pada suhu 400-600°C
3. **Pirolisis** - Terjadi dekomposisi termal menghasilkan uap hidrokarbon
4. **Kondensasi** - Uap didinginkan dalam kondenser menjadi cairan
5. **Pemisahan** - Produk dipisahkan menjadi minyak dan gas dalam tangki pemisah
6. **Penyimpanan** - Minyak dan gas disimpan dalam tangki penyimpanan masing-masing

## Cara Menggunakan Aplikasi

1. Jalankan aplikasi dengan perintah `npm start`
2. Klik pada bagian-bagian peralatan dalam visualisasi 3D untuk melihat informasi detail
3. Gunakan mouse untuk:
   - Memutar model (klik dan geser)
   - Zoom (scroll mouse)
   - Pindahkan model (klik kanan dan geser)
4. Panel informasi di sebelah kanan menampilkan detail komponen yang dipilih

## Teknologi yang Digunakan

- React.js - UI framework
- Three.js - Library 3D
- React Three Fiber - React renderer untuk Three.js
- React Three Drei - Koleksi utilitas untuk React Three Fiber

## Instalasi dan Menjalankan

```
npm install
npm start
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

pirolisis.netlify.app

# pyrolysis-3d-visualization
