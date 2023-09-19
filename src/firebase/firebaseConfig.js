// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//! yetkilendirme icin gerekli importlar
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt60Lp9U6l0m5LH21totzFTZzduvqf1VY",
  authDomain: "chat-2d038.firebaseapp.com",
  projectId: "chat-2d038",
  storageBucket: "chat-2d038.appspot.com",
  messagingSenderId: "740339105401",
  appId: "1:740339105401:web:db44706c32ae8914e8dea8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! yetkilendirme icin gerekli kurulum
export const auth = getAuth(app);

//! google saylayicisi kurulum
export const provider = new GoogleAuthProvider();

//! Veri tabani kurulum
export const db = getFirestore(app);
