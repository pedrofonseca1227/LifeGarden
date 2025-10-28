import React, { useEffect, useState } from "react";
import { getUserChats } from "../services/messageService";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

// 🔹 Imagem padrão local (adicione o arquivo em src/assets/sem-imagem.png)
import noImage from "../assets/sem-imagem.png";

const Conversas = () => {
  const { user } = useAuth();
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return;

      const chats = (await getUserChats(user.email)) || [];

      // 🔍 Busca o produto relacionado a cada chat
      const chatsComProduto = await Promise.all(
        chats.map(async (chat) => {
          const produtoRef = doc(db, "produtos", chat.chatId);
          const produtoSnap = await getDoc(produtoRef);

          return {
            ...chat,
            produto: produtoSnap.exists() ? produtoSnap.data() : null,
          };
        })
      );

      setConversas(chatsComProduto);
    };

    fetchChats();
  }, [user]);

  if (!user)
    return (
      <p style={{ color: "#fff" }}>Faça login para ver suas conversas.</p>
    );

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2>💬 Minhas Conversas</h2>

      {conversas.length === 0 ? (
        <p>Nenhuma conversa encontrada.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {(conversas || []).map((c, i) => (
            <Link
              key={`${c.chatId || "semId"}-${i}`}
              to={`/chat/${c.chatId || ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#1f1f1f",
                borderRadius: "10px",
                padding: "10px",
                textDecoration: "none",
                color: "white",
                transition: "background 0.2s ease",
              }}
            >
              {/* 🖼️ Miniatura do produto */}
              <img
                src={
                  c.produto?.imagens?.[0] ||
                  noImage // ✅ imagem local padrão
                }
                alt={c.produto?.nome || "Produto"}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              {/* 💬 Informações da conversa */}
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: 0,
                    color: "#d4ed91",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {c.produto?.nome || "Produto removido"}
                </h4>

                <p
                  style={{
                    margin: "4px 0",
                    fontSize: "14px",
                    color: "#aaa",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "250px",
                  }}
                >
                  {c.ultimoRemetente === user.email
                    ? `Você: ${String(c.ultimaMensagem || "")}`
                    : String(c.ultimaMensagem || "")}
                </p>

                {/* 🕒 Data da última mensagem */}
                {c.createdAt && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#777",
                      margin: 0,
                    }}
                  >
                    {c.createdAt.toDate
                      ? c.createdAt.toDate().toLocaleString()
                      : new Date(c.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Conversas;
