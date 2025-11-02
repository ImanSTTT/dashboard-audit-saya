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

// Inisialisasi Firebase.
const app = initializeApp(firebaseConfig);

// Inisialisasi Cloud Firestore dan ekspor.
export const db = getFirestore(app);
