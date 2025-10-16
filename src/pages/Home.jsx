import React, { useEffect, useState } from "react";
import { getProdutos } from "../services/productService";
import { Link } from "react-router-dom";

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProdutos();
      setProdutos(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#d4ed91", marginBottom: "20px" }}>
        Produtos disponíveis 🌿
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {produtos.length === 0 ? (
          <p style={{ color: "#fff" }}>Nenhum produto cadastrado ainda.</p>
        ) : (
          produtos.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: "#1f1f1f",
                borderRadius: "10px",
                padding: "15px",
                color: "#fff",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* ✅ Exibir imagem */}
              {p.imagem ? (
                <img
                  src={p.imagem}
                  alt={p.nome}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    backgroundColor: "#333",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#aaa",
                    fontSize: "14px",
                  }}
                >
                  Sem imagem
                </div>
              )}

              {/* Nome e detalhes */}
              <h3 style={{ marginBottom: "8px", color: "#d4ed91" }}>{p.nome}</h3>
              <p>
                <strong>Preço:</strong> R$ {p.preco.toFixed(2)}
              </p>
              <p>
                <strong>Descrição:</strong> {p.descricao}
              </p>
              <p>
                <em>Anunciado por:</em> {p.produtorEmail}
              </p>

              {/* ✅ Botão de conversa */}
              <Link
                to={`/chat/${p.id}`}
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                Conversar com o produtor
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
