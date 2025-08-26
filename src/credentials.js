// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhiLmSJTcCSGuFcaDwew-Fi1c0N2vlwjQ",
  authDomain: "mini-single-page-application.firebaseapp.com", 
  projectId: "mini-single-page-application",
  storageBucket: "mini-single-page-application.appspot.com",
  messagingSenderId: "753512206185",
  appId: "1:753512206185:web:1acdd6474b7fc73e83b7f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase
export const db = getFirestore(app);