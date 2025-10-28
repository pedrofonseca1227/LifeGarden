import { db, storage } from './firebaseConfig';
import {
  collection, addDoc, getDocs, query, orderBy, where, doc, deleteDoc, updateDoc}
from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Referência da coleção
const produtosRef = collection(db, 'produtos');


// ✅ Upload múltiplo de imagens
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


// ✅ Adicionar produto (com múltiplas imagens)
export const addProduto = async (produto, imagens = []) => {
  try {
    const imageUrls = imagens.length > 0 ? await uploadMultipleImages(imagens) : [];
    await addDoc(produtosRef, {
      ...produto,
      imagens: imageUrls,
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw error;
  }
};


// ✅ Buscar todos os produtos
export const getProdutos = async () => {
  const q = query(produtosRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


// ✅ Upload de uma imagem (caso queira usar em outra tela)
export const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `produtos/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
};


// ✅ Buscar produtos de um produtor específico
export const getProdutosByUser = async (email) => {
  const q = query(produtosRef, where("produtorEmail", "==", email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


// ✅ Excluir produto
export const deleteProduto = async (id) => {
  await deleteDoc(doc(db, "produtos", id));
};


// ✅ Editar produto (mantém ou adiciona imagens novas)
export const updateProduto = async (id, dadosAtualizados, novasImagens = []) => {
  const produtoRef = doc(db, 'produtos', id);

  // Se tiver novas imagens, envia e adiciona no array existente
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
