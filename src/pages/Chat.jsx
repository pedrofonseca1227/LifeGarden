import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { sendMessage, listenMessages } from "../services/messageService";
import { db } from "../services/firebaseConfig";
import AvaliacaoForm from "../components/AvaliacaoForm";
import { doc, getDoc } from "firebase/firestore";

const Chat = () => {
  const { chatId } = useParams();
  const { user } = useAuth();

  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const [produto, setProduto] = useState(null);
  const [destinatarioEmail, setDestinatarioEmail] = useState("");

  // ✅ Buscar informações do produto
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const produtoRef = doc(db, "produtos", chatId);
        const produtoSnap = await getDoc(produtoRef);
        if (produtoSnap.exists()) {
          const produtoData = produtoSnap.data();
          setProduto(produtoData);

          // 🔄 Define destinatário como o produtor, se o usuário for o comprador
          if (produtoData.produtorEmail && produtoData.produtorEmail !== user.email) {
            setDestinatarioEmail(produtoData.produtorEmail);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduto();
  }, [chatId, user.email]);

  // ✅ Escutar mensagens em tempo real
  useEffect(() => {
    const unsubscribe = listenMessages(chatId, (msgs) => setMensagens(msgs));
    return () => unsubscribe();
  }, [chatId]);

  // ✅ Detecta automaticamente o outro participante (caso o produtor responda)
  useEffect(() => {
    if (!destinatarioEmail && mensagens.length > 0) {
      const outraPessoa = mensagens.find((msg) => msg.remetenteEmail !== user.email);
      if (outraPessoa) {
        setDestinatarioEmail(outraPessoa.remetenteEmail);
      }
    }
  }, [mensagens, user.email, destinatarioEmail]);

  // ✅ Enviar mensagem
  const handleSend = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    const destinatario =
      destinatarioEmail || produto?.produtorEmail || "";

    if (!destinatario) {
      alert("Erro: destinatário não encontrado.");
      return;
    }

    try {
      await sendMessage(chatId, user.email, destinatario, texto.trim());
      setTexto("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#1f1f1f",
        borderRadius: "10px",
        color: "#fff",
      }}
    >
      {/* ✅ Cabeçalho do produto */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
          borderBottom: "1px solid #444",
          paddingBottom: "10px",
        }}
      >
        {produto?.imagem ? (
          <img
            src={produto.imagem}
            alt={produto.nome}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          />
        ) : (
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#333",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          />
        )}

        <div>
          <h3 style={{ margin: 0, color: "#d4ed91" }}>
            {produto?.nome || "Produto"}
          </h3>
        </div>
      </div>

      {/* ✅ Mensagens */}
      <div
        style={{
          backgroundColor: "#2c2c2c",
          borderRadius: "8px",
          padding: "10px",
          height: "400px",
          overflowY: "auto",
          marginBottom: "15px",
        }}
      >
        {mensagens.length === 0 ? (
          <p style={{ color: "#aaa" }}>Nenhuma mensagem ainda.</p>
        ) : (
          mensagens.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: "10px",
                textAlign:
                  msg.remetenteEmail === user.email ? "right" : "left",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor:
                    msg.remetenteEmail === user.email ? "#4CAF50" : "#333",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  maxWidth: "75%",
                  wordWrap: "break-word",
                }}
              >
                <p style={{ margin: 0 }}>{msg.texto}</p>
              </div>
              <p style={{ fontSize: "12px", color: "#aaa", margin: "3px 0" }}>
                {msg.remetenteEmail}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ✅ Input de mensagem */}
      <form
        onSubmit={handleSend}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite sua mensagem..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #555",
            backgroundColor: "#2a2a2a",
            color: "white",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </form>
      {/* 🧠 Formulário de avaliação */}
      {produto?.produtorEmail && (
        <AvaliacaoForm produtorEmail={produto.produtorEmail} />
      )}
    </div>
  );
};

export default Chat;
