// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMX3xb5Kyg-nAAnxv5-80-76Vkk3nJDys",
  authDomain: "real-time-chat-app-48582.firebaseapp.com",
  projectId: "real-time-chat-app-48582",
  storageBucket: "real-time-chat-app-48582.firebasestorage.app",
  messagingSenderId: "540746911342",
  appId: "1:540746911342:web:727cac42566f01ab53a07f",
  measurementId: "G-D8755F4GMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
