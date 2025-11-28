import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { addProduto } from "../services/productService";
import "../styles/novoProduto.css";

const NovoProduto = () => {
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagens, setImagens] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Faça login para cadastrar um produto.");

    try {
      setUploading(true);

      await addProduto(
        {
          nome,
          preco: parseFloat(preco),
          descricao,
          categoria,
          produtorEmail: user.email,
        },
        imagens
      );

      alert("Produto cadastrado com sucesso!");
      setNome("");
      setPreco("");
      setDescricao("");
      setCategoria("");
      setImagens([]);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao cadastrar produto.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="novoproduto-page">
      <h2 className="novoproduto-title">Cadastrar Novo Produto</h2>

      <form className="novoproduto-form" onSubmit={handleSubmit}>
        <input
          className="novoproduto-input"
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          className="novoproduto-input"
          type="number"
          placeholder="Preço (R$)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <textarea
          className="novoproduto-textarea"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <input
          className="novoproduto-input"
          type="text"
          placeholder="Ex: Legumes, frutas, hortaliças..."
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />

        <input
          className="novoproduto-file"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImagens(Array.from(e.target.files))}
        />

        {imagens.length > 0 && (
          <div className="preview-container">
            {imagens.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="preview-item"
              />
            ))}
          </div>
        )}

        <button className="novoproduto-button" type="submit" disabled={uploading}>
          {uploading ? "Enviando..." : "Cadastrar Produto"}
        </button>
      </form>
    </div>
  );
};

export default NovoProduto;
