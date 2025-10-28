import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProdutosByUser, deleteProduto } from "../services/productService";
import { Link } from "react-router-dom";

const MeusProdutos = () => {
  const { user } = useAuth();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      if (!user) return;
      const data = await getProdutosByUser(user.email);
      setProdutos(data);
    };
    fetchProdutos();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteProduto(id);
      setProdutos(produtos.filter((p) => p.id !== id));
    }
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2>🧺 Meus Produtos</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {produtos.map((produto) => (
            <div
              key={produto.id}
              style={{
                backgroundColor: "#1f1f1f",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* 🖼️ Exibir primeira imagem */}
              <img
                src={
                  produto.imagens?.[0] ||
                  "https://via.placeholder.com/300x200?text=Sem+imagem"
                }
                alt={produto.nome}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />

              <h3 style={{ color: "#d4ed91" }}>{produto.nome}</h3>
              <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
              <p style={{ fontSize: "14px" }}>{produto.descricao}</p>

              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <Link
                  to={`/editar-produto/${produto.id}`}
                  style={btnStyle("#4CAF50")}
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(produto.id)}
                  style={btnStyle("red")}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const btnStyle = (color) => ({
  backgroundColor: color,
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  textDecoration: "none",
});

export default MeusProdutos;
