import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const produtosRef = collection(db, 'produtos');

// Adicionar produto
export const addProduto = async (produto) => {
  await addDoc(produtosRef, {
    ...produto,
    createdAt: new Date()
  });
};

// Buscar todos os produtos
export const getProdutos = async () => {
  const q = query(produtosRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
