import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkjZ2D2IV4GupCu3_vnEWpO5PCnLdMam8",
  authDomain: "life-garden-211a0.firebaseapp.com",
  projectId: "life-garden-211a0",
  storageBucket: "life-garden-211a0.firebasestorage.app",
  messagingSenderId: "773535448845",
  appId: "1:773535448845:web:6511d887de3296b6b17a44"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);