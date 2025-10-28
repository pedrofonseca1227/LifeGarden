import { db } from "./firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const avaliacoesRef = collection(db, "avaliacoes");

// Adicionar nova avaliação
export const addAvaliacao = async (avaliacao) => {
  await addDoc(avaliacoesRef, {
    ...avaliacao,
    data: new Date(),
  });
};

// Buscar avaliações de um produtor
export const getAvaliacoesByProdutor = async (email) => {
  const q = query(avaliacoesRef, where("produtorEmail", "==", email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
