import React, { useEffect, useState } from "react";
import { getUserChats, deleteChat } from "../services/messageService";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

import noImage from "../assets/sem-imagem.png";
import "../styles/conversas.css";

const Conversas = () => {
  const { user } = useAuth();
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;

      const chats = await getUserChats(user.email);

      const chatsComProduto = await Promise.all(
        chats.map(async (c) => {
          const produtoId = c.chatId.split("_")[0];
          const snap = await getDoc(doc(db, "produtos", produtoId));

          return {
            ...c,
            produto: snap.exists() ? snap.data() : null,
          };
        })
      );

      setConversas(chatsComProduto);
    };

    fetch();
  }, [user]);

  const remover = async (chatId) => {
    if (!window.confirm("Deseja realmente excluir esta conversa?")) return;

    await deleteChat(chatId, user.email);
    setConversas((prev) => prev.filter((c) => c.chatId !== chatId));
  };

  if (!user) return <p className="conv-alert">Faça login para ver suas conversas.</p>;

  return (
    <div className="conv-container">
      <h2 className="conv-title">💬 Minhas Conversas</h2>

      {conversas.length === 0 ? (
        <p className="conv-empty">Nenhuma conversa encontrada.</p>
      ) : (
        <div className="conv-list">
          {conversas.map((c, i) => {
            const comprador = c.chatId.split("_")[1];
            const outro =
              user.email === comprador ? c.produto?.produtorEmail : comprador;

            const avatar = outro?.split("@")[0].slice(0, 2).toUpperCase() || "US";

            const data = new Date(c.ultimaMensagemData).toLocaleString();

            return (
              <Link key={i} to={`/chat/${c.chatId}`} className="conv-item">
                <div className="conv-thumb">
                  <img src={c.produto?.imagens?.[0] || noImage} className="conv-img" />

                  <div className="conv-avatar">
                    <span className="conv-avatar-label">{avatar}</span>
                  </div>
                </div>

                <div className="conv-info">
                  <h4 className="conv-produto-nome">
                    {c.produto?.nome || "Produto Removido"}
                  </h4>

                  <p className="conv-ultima-msg">
                    {c.ultimoRemetente === user.email
                      ? `Você: ${c.ultimaMensagem}`
                      : c.ultimaMensagem}
                  </p>
                </div>

                <div className="conv-meta">
                  <p className="conv-data">{data}</p>
                </div>

                <button
                  className="conv-delete-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    remover(c.chatId);
                  }}
                >
                  🗑
                </button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Conversas;
