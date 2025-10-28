import React, { useState } from "react";
import { addAvaliacao } from "../services/avaliacaoService";
import { useAuth } from "../hooks/useAuth";

const AvaliacaoForm = ({ produtorEmail }) => {
  const { user } = useAuth();
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Você precisa estar logado para avaliar.");

    await addAvaliacao({
      produtorEmail,
      avaliadorEmail: user.email,
      nota,
      comentario,
    });

    setEnviado(true);
  };

  if (enviado)
    return <p style={{ color: "#4CAF50" }}>✅ Avaliação enviada com sucesso!</p>;

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h4 style={{ color: "#d4ed91" }}>Avalie o produtor:</h4>

      {/* ⭐ Campo de nota */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            onClick={() => setNota(n)}
            style={{
              fontSize: "22px",
              cursor: "pointer",
              color: n <= nota ? "#FFD700" : "#777",
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* 💬 Campo de comentário */}
      <textarea
        placeholder="Deixe um comentário (opcional)"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #555",
          backgroundColor: "#2a2a2a",
          color: "white",
          minHeight: "60px",
        }}
      />

      <button
        type="submit"
        style={{
          marginTop: "10px",
          padding: "8px 15px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "white",
          cursor: "pointer",
        }}
      >
        Enviar Avaliação
      </button>
    </form>
  );
};

export default AvaliacaoForm;
