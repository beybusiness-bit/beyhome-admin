import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC8uy09XOeEYIs1m3Rga5BMqd7gS7o3roI",
  authDomain: "beyhome-admin.firebaseapp.com",
  projectId: "beyhome-admin",
  storageBucket: "beyhome-admin.firebasestorage.app",
  messagingSenderId: "849320781553",
  appId: "1:849320781553:web:5bb2c1194b881f29aa2b50"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Authentication 초기화
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
