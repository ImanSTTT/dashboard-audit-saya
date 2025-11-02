
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi dari proyek Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyD-74qyuI2zD4aBeI_wGSTM5XfXaendM",
  authDomain: "audit-6214b.firebaseapp.com",
  projectId: "audit-6214b",
  storageBucket: "audit-6214b.firebasestorage.app",
  messagingSenderId: "425177114300",
  appId: "1:425177114300:web:9a4b2f09cb0ee9a8d52b9",
  measurementId: "G-KPPQBSLW4B"
};

// Cek apakah konfigurasi masih placeholder. Ini penting untuk memandu pengguna
// agar memasukkan kredensial mereka sendiri jika file ini di-reset.
export const isFirebaseConfigPlaceholder =
  firebaseConfig.apiKey === 'PASTE_YOUR_API_KEY_HERE';

// Inisialisasi Firebase.
// Aplikasi hanya akan diinisialisasi jika konfigurasi *bukan* placeholder.
const app = !isFirebaseConfigPlaceholder ? initializeApp(firebaseConfig) : null;

// Inisialisasi Cloud Firestore dan ekspor.
// Akan bernilai `null` jika Firebase tidak diinisialisasi, ini akan ditangani di UI
// untuk menampilkan pesan konfigurasi.
export const db = app ? getFirestore(app) : null;
