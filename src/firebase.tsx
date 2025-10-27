// src/firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZPqPPsr9jV7DSTQh2btVvgLxIJH7vZLU",
  authDomain: "campusmarket-74116.firebaseapp.com",
  projectId: "campusmarket-74116",
  storageBucket: "campusmarket-74116.firebasestorage.app",
  messagingSenderId: "881733822988",
  appId: "1:881733822988:web:b35e113ec6b0ba00c65c29",
  measurementId: "G-NGBK0V1KKE"
};
const app: FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Validate initialization
if (!app.name || app.name === '[DEFAULT]') {
  console.log('Firebase initialized successfully:', app.name);
} else {
  console.error('Firebase initialization failed:', app.name);
}