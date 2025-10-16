import React, { useEffect, useState } from "react";
import { getProdutosByUser, deleteProduto } from "../services/productService";
import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom';


const MeusProdutos = () => {
  const { user } = useAuth();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        const data = await getProdutosByUser(user.email);
        setProdutos(data);
      }
    };
    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteProduto(id);
      setProdutos(produtos.filter((p) => p.id !== id));
    }
  };

  if (!user) {
    return <p>Você precisa estar logado para acessar esta página.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Meus Produtos 🌾</h2>

      {produtos.length === 0 ? (
        <p>Você ainda não cadastrou nenhum produto.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {produtos.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: "#1f1f1f",
                color: "#fff",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              {p.imagem && (
                <img
                  src={p.imagem}
                  alt={p.nome}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              )}
              <h3 style={{ margin: "10px 0" }}>{p.nome}</h3>
              <p><strong>Preço:</strong> R$ {p.preco.toFixed(2)}</p>
              <p><strong>Descrição:</strong> {p.descricao}</p>
          
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Link
                  to={`/editar-produto/${p.id}`}
                  style={{
                    backgroundColor: "#3498db",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
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

export default MeusProdutos;
