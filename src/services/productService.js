import { db, storage } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getUserProfile } from "./userService";

// Referência da coleção
const produtosRef = collection(db, 'produtos');


const uploadMultipleImages = async (files) => {
  const urls = [];

  for (const file of files) {
    const storageRef = ref(storage, `produtos/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    urls.push(url);
  }

  return urls;
};



export const addProduto = async (produto, imagens = []) => {
  try {
    // 1) Pega dados do produtor via email
    const perfilProdutor = await getUserProfile(produto.produtorEmail);

    // 2) Upload de imagens
    const imageUrls =
      imagens.length > 0 ? await uploadMultipleImages(imagens) : [];

    // 3) Salvar documento
    await addDoc(produtosRef, {
      ...produto,
      produtorNome: perfilProdutor?.nome || "", // ← ADICIONADO
      imagens: imageUrls,
      createdAt: new Date()
    });

  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw error;
  }
};



export const getProdutos = async () => {
  const q = query(produtosRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};



export const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `produtos/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
};



export const getProdutosByUser = async (email) => {
  const q = query(produtosRef, where("produtorEmail", "==", email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};



export const deleteProduto = async (id) => {
  await deleteDoc(doc(db, "produtos", id));
};



export const updateProduto = async (id, dadosAtualizados, novasImagens = []) => {
  const produtoRef = doc(db, 'produtos', id);

  let imageUrls = [];
  if (novasImagens.length > 0) {
    imageUrls = await uploadMultipleImages(novasImagens);
  }

  await updateDoc(produtoRef, {
    ...dadosAtualizados,
    ...(imageUrls.length > 0 && {
      imagens: [...(dadosAtualizados.imagens || []), ...imageUrls],
    }),
  });
};
