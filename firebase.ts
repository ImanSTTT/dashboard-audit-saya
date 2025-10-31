// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-T4qyu5lzI04aBeI_w6gsTHSxfaaemdM",
  authDomain: "audit-6214b.firebaseapp.com",
  projectId: "audit-6214b",
  storageBucket: "audit-6214b.firebasestorage.app",
  messagingSenderId: "425177114300",
  appId: "1:425177114300:web:7404467a654c69528d52b9",
  measurementId: "G-6M54N114K5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
