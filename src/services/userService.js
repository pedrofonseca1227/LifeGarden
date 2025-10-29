import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Salvar ou atualizar informações do usuário
export const saveUserProfile = async (email, data) => {
  const userRef = doc(db, "usuarios", email);
  await setDoc(userRef, data, { merge: true });
};

// Buscar informações do usuário
export const getUserProfile = async (email) => {
  const userRef = doc(db, "usuarios", email);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
};
