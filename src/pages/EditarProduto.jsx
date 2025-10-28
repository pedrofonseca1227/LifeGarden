import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { updateProduto } from "../services/productService";

const EditarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagensAtuais, setImagensAtuais] = useState([]); // imagens já existentes
  const [novasImagens, setNovasImagens] = useState([]); // novas imagens adicionadas
  const [uploading, setUploading] = useState(false);

  // 🔹 Buscar dados do produto
  useEffect(() => {
    const fetchProduto = async () => {
      const produtoRef = doc(db, "produtos", id);
      const produtoSnap = await getDoc(produtoRef);
      if (produtoSnap.exists()) {
        const data = produtoSnap.data();
        setProduto(data);
        setNome(data.nome);
        setPreco(data.preco);
        setDescricao(data.descricao);
        setImagensAtuais(data.imagens || []); // carrega imagens existentes
      } else {
        alert("Produto não encontrado.");
        navigate("/meus-produtos");
      }
    };
    fetchProduto();
  }, [id, navigate]);

  // 🔹 Remover imagem existente localmente
  const handleRemoverImagem = (index) => {
    setImagensAtuais((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Salvar alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      const dadosAtualizados = {
        nome,
        preco: parseFloat(preco),
        descricao,
        imagens: imagensAtuais, // mantém as atuais
      };

      await updateProduto(id, dadosAtualizados, novasImagens);

      alert("✅ Produto atualizado com sucesso!");
      navigate("/meus-produtos");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!produto) return <p style={{ color: "#fff" }}>Carregando...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", color: "#fff" }}>
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do produto"
          required
          style={inputStyle}
        />
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Preço"
          required
          style={inputStyle}
        />
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          required
          style={inputStyle}
        />

        {/* 📸 Upload de novas imagens */}
        <label>Adicionar novas imagens:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setNovasImagens(Array.from(e.target.files))}
          style={{ color: "#fff" }}
        />

        {/* 🖼️ Preview das imagens novas */}
        {novasImagens.length > 0 && (
          <div style={previewContainer}>
            {novasImagens.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="nova"
                style={previewImage}
              />
            ))}
          </div>
        )}

        {/* 🖼️ Imagens atuais */}
        {imagensAtuais.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h4>Imagens atuais:</h4>
            <div style={previewContainer}>
              {imagensAtuais.map((url, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={url} alt="atual" style={previewImage} />
                  <button
                    type="button"
                    onClick={() => handleRemoverImagem(i)}
                    style={removeButton}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          style={{
            marginTop: "15px",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {uploading ? "Salvando..." : "Salvar alterações"}
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

const previewContainer = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "10px",
};

const previewImage = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
  border: "1px solid #444",
};

const removeButton = {
  position: "absolute",
  top: "-6px",
  right: "-6px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  cursor: "pointer",
  fontSize: "12px",
  lineHeight: "18px",
};

export default EditarProduto;
