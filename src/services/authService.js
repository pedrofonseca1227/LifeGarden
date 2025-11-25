import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
