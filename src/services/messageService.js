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
   Formato do chatId: produtoId_emailDoComprador
============================================================ */
export const validarAcessoChat = async (chatId, userEmail) => {
  try {
    const [produtoId, compradorEmail] = chatId.split("_");

    // Se o formato estiver errado → bloqueia
    if (!produtoId || !compradorEmail) return false;

    const ref = doc(db, "produtos", produtoId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return false;

    const produto = snap.data();
    const produtorEmail = produto.produtorEmail;

    // Apenas comprador OU produtor podem acessar
    return userEmail === compradorEmail || userEmail === produtorEmail;

  } catch (err) {
    console.error("Erro validarAcessoChat:", err);
    return false;
  }
};

/* ============================================================
   🔵 2 — Enviar mensagem
============================================================ */
export const sendMessage = async (chatId, remetenteEmail, destinatarioEmail, texto) => {
  try {
    const mensagensRef = collection(db, "mensagens");

    await addDoc(mensagensRef, {
      chatId,
      remetenteEmail,
      destinatarioEmail,
      texto,
      createdAt: new Date(),
    });

  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    throw err;
  }
};

/* ============================================================
   🔵 3 — Escutar mensagens em tempo real
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

  } catch (err) {
    console.error("Erro listenMessages:", err);
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

        const ultimaData = m.createdAt?.toDate?.() || m.createdAt;

        if (!chats.has(chatId) || ultimaData > chats.get(chatId).ultimaMensagemData) {
          chats.set(chatId, {
            chatId,
            ultimaMensagem: m.texto,
            ultimoRemetente: m.remetenteEmail,
            ultimaMensagemData: ultimaData,
          });
        }
      });
    };

    processar(s1);
    processar(s2);

    return [...chats.values()].sort((a, b) => b.ultimaMensagemData - a.ultimaMensagemData);

  } catch (err) {
    console.error("Erro getUserChats:", err);
    return [];
  }
};

/* ============================================================
   🔴 5 — Apagar conversa
============================================================ */
export const deleteChat = async (chatId, userEmail) => {
  try {
    const permitido = await validarAcessoChat(chatId, userEmail);

    if (!permitido) {
      throw new Error("Usuário não autorizado a excluir.");
    }

    const mensagensRef = collection(db, "mensagens");
    const q = query(mensagensRef, where("chatId", "==", chatId));

    const snap = await getDocs(q);
    const deletes = snap.docs.map((d) => deleteDoc(d.ref));

    await Promise.all(deletes);
    console.log("Conversa excluída com sucesso:", chatId);

  } catch (err) {
    console.error("Erro deleteChat:", err);
    throw err;
  }
};
