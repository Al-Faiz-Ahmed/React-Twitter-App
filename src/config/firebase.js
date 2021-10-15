
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";


const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDAMm5RwG1r3prF97ptjqz409w-HUcJB50",
  authDomain: "faizwebapp.firebaseapp.com",
  projectId: "faizwebapp",
  storageBucket: "faizwebapp.appspot.com",
  messagingSenderId: "234691537513",
  appId: "1:234691537513:web:416d35f3e3f2b35517d0f8",
  measurementId: "G-DNCRTL1F2Y"
});

const auth = getAuth()
const db = getFirestore()

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getDoc,
  db,
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  signOut
}

