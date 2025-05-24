// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALG_4LHM7j-H6nP_O0tgEwng2Lwhm5VbU",
  authDomain: "melora-game-website.firebaseapp.com",
  projectId: "melora-game-website",
  storageBucket: "melora-game-website.firebasestorage.app",
  messagingSenderId: "913087403813",
  appId: "1:913087403813:web:f083789014f18406caeccc",
  measurementId: "G-BJPQFQCKXM"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
