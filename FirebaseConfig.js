import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCbuqcuhcT2ZZm9JHSYfdqE9gplsL8phbk",
  authDomain: "pawlink-9dcc9.firebaseapp.com",
  databaseURL: "https://pawlink-9dcc9-default-rtdb.firebaseio.com",
  projectId: "pawlink-9dcc9",
  storageBucket: "pawlink-9dcc9.appspot.com",
  messagingSenderId: "919518194725",
  appId: "1:919518194725:web:c2474f995950e20e3a23cc",
  measurementId: "G-5W6RXMBL4D"
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP); 
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_REALTIME_DB = getDatabase(FIREBASE_APP);
