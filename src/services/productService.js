import { db, storage } from './firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

// Upload de imagem
export const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `produtos/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
};