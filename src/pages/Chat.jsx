import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { sendMessage, listenMessages } from "../services/messageService";

const Chat = () => {
  const { chatId } = useParams(); // identificador do chat
  const { user } = useAuth();
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const unsubscribe = listenMessages(chatId, setMensagens);
    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    await sendMessage(chatId, user.email, texto.trim());
    setTexto("");
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
      <h2>Chat</h2>
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
          <p>Nenhuma mensagem ainda.</p>
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
                    msg.remetenteEmail === user.email
                      ? "#4CAF50"
                      : "#333",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "15px",
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
    </div>
  );
};

export default Chat;
