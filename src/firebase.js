import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFnbvAqXvve3P4UV6eHxWMqDC_ut6UUdc",
  authDomain: "restaurant-340f0.firebaseapp.com",
  projectId: "restaurant-340f0",
  storageBucket: "restaurant-340f0.appspot.com",
  messagingSenderId: "1068188887362",
  appId: "1:1068188887362:web:6e99d7204e9f93b90a00db",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);

export { db, signInWithEmailAndPassword, auth, onAuthStateChanged, signOut };
