import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserChats } from "../services/messageService";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const Conversas = () => {
  const { user } = useAuth();
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    const fetchConversas = async () => {
      if (!user) return;

      const data = await getUserChats(user.email);

      // Buscar detalhes do produto de cada chat (nome e imagem)
      const conversasComProduto = await Promise.all(
        data.map(async (c) => {
          const produtoRef = doc(db, "produtos", c.chatId);
          const produtoSnap = await getDoc(produtoRef);
          const produto = produtoSnap.exists() ? produtoSnap.data() : {};
          return { ...c, produto };
        })
      );

      setConversas(conversasComProduto);
    };

    fetchConversas();
  }, [user]);

  if (!user) return <p>Você precisa estar logado para ver suas conversas.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#d4ed91" }}>Minhas Conversas 💬</h2>

      {conversas.length === 0 ? (
        <p>Nenhuma conversa encontrada.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {conversas.map((c) => (
            <Link
              key={c.chatId}
              to={`/chat/${c.chatId}`}
              style={{
                backgroundColor: "#1f1f1f",
                borderRadius: "10px",
                padding: "15px",
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                boxShadow: "0 0 8px rgba(0,0,0,0.3)",
              }}
            >
              {c.produto?.imagem ? (
                <img
                  src={c.produto.imagem}
                  alt={c.produto.nome}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    backgroundColor: "#333",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#aaa",
                    fontSize: "12px",
                  }}
                >
                  Sem imagem
                </div>
              )}

              <div>
                <h3 style={{ margin: 0 }}>
                  {c.produto?.nome || "Produto removido"}
                </h3>
                <p style={{ margin: "5px 0", color: "#bbb" }}>
                  {c.ultimoTexto?.length > 40
                    ? c.ultimoTexto.slice(0, 40) + "..."
                    : c.ultimoTexto}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Conversas;
