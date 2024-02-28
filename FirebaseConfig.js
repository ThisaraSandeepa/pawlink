// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCbuqcuhcT2ZZm9JHSYfdqE9gplsL8phbk",
  authDomain: "pawlink-9dcc9.firebaseapp.com",
  projectId: "pawlink-9dcc9",
  storageBucket: "pawlink-9dcc9.appspot.com",
  messagingSenderId: "919518194725",
  appId: "1:919518194725:web:c2474f995950e20e3a23cc",
  measurementId: "G-5W6RXMBL4D"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);