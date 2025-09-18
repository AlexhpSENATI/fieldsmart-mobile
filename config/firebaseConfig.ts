import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyBYGDzJvJqzg8MhNCcqkGVvjrGdAQ2cCkQ",
  authDomain: "field-47909.firebaseapp.com",
  databaseURL: "https://field-47909-default-rtdb.firebaseio.com",
  projectId: "field-47909",
  storageBucket: "field-47909.appspot.com",
  messagingSenderId: "221938376418",
  appId: "1:221938376418:web:4893bda21a0bd47ad248bb",
  measurementId: "G-7H7SL4Y26H"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app); 

export { auth, db };
