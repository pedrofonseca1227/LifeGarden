import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { sendMessage, listenMessages, validarAcessoChat } from "../services/messageService";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import AvaliacaoForm from "../components/AvaliacaoForm";

import "../styles/chat.css";

const Chat = () => {
  const { chatId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const [produto, setProduto] = useState(null);
  const [destinatarioEmail, setDestinatarioEmail] = useState("");

  /* ============================================================
     1) CARREGAR PRODUTO PRIMEIRO
  ============================================================ */
  useEffect(() => {
    const fetchProduto = async () => {
      const [produtoId] = chatId.split("_");
      const snap = await getDoc(doc(db, "produtos", produtoId));

      if (snap.exists()) {
        const data = snap.data();
        setProduto(data);

        // Agora sim podemos validar acesso!
        validarAcesso(data);
      } else {
        alert("Produto não encontrado.");
        navigate("/");
      }
    };

    if (chatId) fetchProduto();
  }, [chatId]);

  /* ============================================================
     2) VALIDAR ACESSO DEPOIS QUE O PRODUTO É CARREGADO
  ============================================================ */
  const validarAcesso = async (produtoData) => {
    const permitido =
      user.email === produtoData.produtorEmail ||
      chatId.endsWith(`_${user.email}`);

    if (!permitido) {
      alert("❌ Você não tem permissão para acessar esta conversa.");
      navigate("/");
    }
  };

  /* ============================================================
     3) ESCUTAR MENSAGENS
  ============================================================ */
  useEffect(() => {
    const unsubscribe = listenMessages(chatId, setMensagens);
    return () => unsubscribe();
  }, [chatId]);

  /* ============================================================
     4) DEFINIR DESTINATÁRIO
  ============================================================ */
  useEffect(() => {
    if (!produto) return;

    const compradorEmail = chatId.split("_")[1];

    if (user.email === produto.produtorEmail) {
      setDestinatarioEmail(compradorEmail);
    } else {
      setDestinatarioEmail(produto.produtorEmail);
    }
  }, [produto, user]);

  /* ============================================================
     5) ENVIAR MENSAGEM
  ============================================================ */
  const handleSend = async (e) => {
    e.preventDefault();

    if (!texto.trim()) return;

    await sendMessage(chatId, user.email, destinatarioEmail, texto.trim());
    setTexto("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>{produto?.nome || "Produto"}</h3>
      </div>

      <div className="chat-mensagens">
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`chat-msg ${
              msg.remetenteEmail === user.email ? "msg-enviada" : "msg-recebida"
            }`}
          >
            <div className="chat-bolha">{msg.texto}</div>
            <p className="chat-email">{msg.remetenteEmail}</p>
          </div>
        ))}
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          className="chat-input"
          placeholder="Digite sua mensagem..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button className="chat-btn">Enviar</button>
      </form>

      <div className="chat-avaliacao-box">
        <h4>⭐ Avalie o produtor ao encerrar a conversa</h4>
        {produto?.produtorEmail && (
          <AvaliacaoForm produtorEmail={produto.produtorEmail} />
        )}
      </div>
    </div>
  );
};

export default Chat;
