// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFVZV3ize4TU1-w6xEhvmkoPLuOIXxi3w",
  authDomain: "mytravelplanner-44e0e.firebaseapp.com",
  projectId: "mytravelplanner-44e0e",
  storageBucket: "mytravelplanner-44e0e.firebasestorage.app",
  messagingSenderId: "422186601122",
  appId: "1:422186601122:web:17e4987bd236d9ca2ae5fb",
  measurementId: "G-3446YM30M7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);