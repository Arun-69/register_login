import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA2Rd9H-1EqZ__hU37je1Ja5_CZEb3R1E",
  authDomain: "sample-7fff7.firebaseapp.com",
  projectId: "sample-7fff7",
  storageBucket: "sample-7fff7.firebasestorage.app",
  messagingSenderId: "761415200828",
  appId: "1:761415200828:web:4e2962de103ccd2b3ed339",
  measurementId: "G-74Q0TM2WJ5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
