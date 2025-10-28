import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { addProduto } from "../services/productService";

const NovoProduto = () => {
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState(""); // 🏷️ nova categoria
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

      alert("✅ Produto cadastrado com sucesso!");
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
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        color: "#fff",
      }}
    >
      <h2>Cadastrar Novo Produto</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Preço (R$)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          style={inputStyle}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          style={{ ...inputStyle, minHeight: "80px" }}
        />

        {/* 🏷️ Campo de categoria */}
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Selecione uma categoria</option>
          <option value="Insumos">Insumos</option>
          <option value="Ferramentas">Ferramentas</option>
          <option value="Mudas e Sementes">Mudas e Sementes</option>
          <option value="Alimentos">Alimentos</option>
        </select>

        {/* 📸 Upload de múltiplas imagens */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImagens(Array.from(e.target.files))}
          style={{ color: "#fff" }}
        />

        {/* 🖼️ Preview das imagens */}
        {imagens.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            {imagens.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="preview"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {uploading ? "Enviando..." : "Cadastrar Produto"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #555",
  backgroundColor: "#2a2a2a",
  color: "#fff",
};

export default NovoProduto;
