import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyBYGDzJvJqzg8MhNCcqkGVvjrGdAQ2cCkQ",
//   authDomain: "field-47909.firebaseapp.com",
//   databaseURL: "https://field-47909-default-rtdb.firebaseio.com",
//   projectId: "field-47909",
//   storageBucket: "field-47909.appspot.com",
//   messagingSenderId: "221938376418",
//   appId: "1:221938376418:web:4893bda21a0bd47ad248bb",
//   measurementId: "G-7H7SL4Y26H"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBiPA89yl_4lKC1erP0WMSRgoGUfvJSwtw",
  authDomain: "aplicativo-b486b.firebaseapp.com",
  databaseURL: "https://aplicativo-b486b-default-rtdb.firebaseio.com",
  projectId: "aplicativo-b486b",
  storageBucket: "aplicativo-b486b.firebasestorage.app",
  messagingSenderId: "644036259510",
  appId: "1:644036259510:web:5efa6cf49864d0c6aec017",
  measurementId: "G-CVRLF3GFDE"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
