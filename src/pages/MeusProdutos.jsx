import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProdutosByUser, deleteProduto } from "../services/productService";
import { Link } from "react-router-dom";
import "../styles/meusProdutos.css";

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
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="meusprodutos-page">
      <h2 className="meusprodutos-title">🧺 Meus Produtos</h2>

      {produtos.length === 0 ? (
        <p className="meusprodutos-empty">Você ainda não cadastrou nenhum produto.</p>
      ) : (
        <div className="meusprodutos-grid">
          {produtos.map((produto) => (
            <div key={produto.id} className="meusprodutos-card">
              
              <img
                src={
                  produto.imagens?.[0] ||
                  "https://via.placeholder.com/300x200?text=Sem+imagem"
                }
                alt={produto.nome}
                className="meusprodutos-img"
              />

              <h3 className="meusprodutos-name">{produto.nome}</h3>
              <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
              <p className="meusprodutos-desc">{produto.descricao}</p>

              <div className="meusprodutos-actions">
                <Link
                  to={`/editar-produto/${produto.id}`}
                  className="meusprodutos-btn editar"
                >
                  Editar
                </Link>

                <button
                  onClick={() => handleDelete(produto.id)}
                  className="meusprodutos-btn excluir"
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
