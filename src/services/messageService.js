import { db } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

/* ============================================================
   🔵 1 — Validar acesso ao chat
   chatId no formato: produtoId_emailDoComprador
============================================================ */
export const validarAcessoChat = async (chatId, userEmail) => {
  try {
    if (!chatId || !chatId.includes("_")) return false;

    const [produtoId, compradorEmail] = chatId.split("_");

    if (!produtoId || !compradorEmail) return false;

    const ref = doc(db, "produtos", produtoId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return false;

    const produto = snap.data();
    const produtorEmail = produto.produtorEmail;

    return (
      userEmail === compradorEmail ||
      userEmail === produtorEmail
    );

  } catch {
    return false;
  }
};


/* ============================================================
   🔵 2 — Enviar mensagem
============================================================ */
export const sendMessage = async (
  chatId,
  remetenteEmail,
  destinatarioEmail,
  texto
) => {
  try {
    const mensagensRef = collection(db, "mensagens");

    return await addDoc(mensagensRef, {
      chatId,
      remetenteEmail,
      destinatarioEmail,
      texto,
      createdAt: new Date(),
    });

  } catch (err) {
    throw new Error("Erro ao enviar mensagem");
  }
};


/* ============================================================
   🔵 3 — Ouvir mensagens em tempo real
============================================================ */
export const listenMessages = (chatId, callback) => {
  try {
    const mensagensRef = collection(db, "mensagens");

    const q = query(
      mensagensRef,
      where("chatId", "==", chatId),
      orderBy("createdAt", "asc")
    );

    return onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      callback(msgs);
    });

  } catch {
    return null; // facilita testes e evita branch morto
  }
};


/* ============================================================
   🔵 4 — Buscar conversas do usuário
============================================================ */
export const getUserChats = async (userEmail) => {
  try {
    const mensagensRef = collection(db, "mensagens");

    const q1 = query(mensagensRef, where("remetenteEmail", "==", userEmail));
    const q2 = query(mensagensRef, where("destinatarioEmail", "==", userEmail));

    const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const chats = new Map();

    const processar = (snap) => {
      snap.forEach((doc_) => {
        const m = doc_.data();
        const chatId = m.chatId;

        const dataMsg =
          m.createdAt?.toDate?.() || m.createdAt || new Date(0);

        const existente = chats.get(chatId);

        if (!existente || dataMsg > existente.ultimaMensagemData) {
          chats.set(chatId, {
            chatId,
            ultimaMensagem: m.texto,
            ultimoRemetente: m.remetenteEmail,
            ultimaMensagemData: dataMsg,
          });
        }
      });
    };

    processar(s1);
    processar(s2);

    return [...chats.values()].sort(
      (a, b) => b.ultimaMensagemData - a.ultimaMensagemData
    );

  } catch {
    return [];
  }
};


/* ============================================================
   🔴 5 — Apagar conversa
============================================================ */
export const deleteChat = async (chatId, userEmail) => {
  const permitido = await validarAcessoChat(chatId, userEmail);

  if (!permitido) {
    throw new Error("Usuário não autorizado a excluir.");
  }

  try {
    const mensagensRef = collection(db, "mensagens");
    const q = query(mensagensRef, where("chatId", "==", chatId));

    const snap = await getDocs(q);

    const promises = snap.docs.map((d) => deleteDoc(d.ref));

    await Promise.all(promises);

    return true;
  } catch {
    throw new Error("Erro ao deletar conversa.");
  }
};
