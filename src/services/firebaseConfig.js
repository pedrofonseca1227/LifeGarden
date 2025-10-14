import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6dSIU1j0FI42SeVSYorCiRAX9gsxo97U",
  authDomain: "life-garden-2d8d9.firebaseapp.com",
  projectId: "life-garden-2d8d9",
  storageBucket: "life-garden-2d8d9.firebasestorage.app",
  messagingSenderId: "669282732493",
  appId: "1:669282732493:web:2f548df6e3ac6d28691c84"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
