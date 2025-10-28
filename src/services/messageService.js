import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  or
} from "firebase/firestore";

// Enviar nova mensagem com remetente e destinatário
export const sendMessage = async (chatId, remetenteEmail, destinatarioEmail, texto) => {
  const mensagensRef = collection(db, "mensagens");
  await addDoc(mensagensRef, {
    chatId,
    remetenteEmail,
    destinatarioEmail,
    texto,
    createdAt: new Date(),
  });
};

// Escutar mensagens em tempo real
export const listenMessages = (chatId, callback) => {
  const mensagensRef = collection(db, "mensagens");
  const q = query(
    mensagensRef,
    where("chatId", "==", chatId),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const mensagens = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(mensagens);
  });
};

// ✅ Buscar todas as conversas em que o usuário participou
export const getUserChats = async (userEmail) => {
  const mensagensRef = collection(db, "mensagens");
  const q = query(
    mensagensRef,
    where("remetenteEmail", "==", userEmail)
  );

  const snapshot = await getDocs(q);
  const chats = new Map();

  snapshot.forEach((doc) => {
    const msg = doc.data();
    if (!chats.has(msg.chatId)) {
      chats.set(msg.chatId, {
        chatId: msg.chatId,
        ultimoTexto: msg.texto,
        ultimaMensagem: msg.createdAt?.toDate?.() || msg.createdAt,
      });
    }
  });

  return Array.from(chats.values()).sort(
    (a, b) => b.ultimaMensagem - a.ultimaMensagem
  );
};
