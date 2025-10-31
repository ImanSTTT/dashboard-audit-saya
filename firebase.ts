
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD-T4qyu5lzI04aBeI_w6gsTHSxfaaemdM",
  authDomain: "audit-6214b.firebaseapp.com",
  projectId: "audit-6214b",
  storageBucket: "audit-6214b.firebasestorage.app",
  messagingSenderId: "425177114300",
  appId: "1:425177114300:web:9a47b2f09cb0ee9a8d52b9",
  measurementId: "G-KPPQBSLW4B"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Cloud Firestore dan ekspor
export const db = getFirestore(app);
