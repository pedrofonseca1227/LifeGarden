import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getUserProfile } from "../services/userService";

const DetalhesProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [produtor, setProdutor] = useState(null);
  const [imagemAtiva, setImagemAtiva] = useState(0);

  useEffect(() => {
    const fetchProduto = async () => {
      const ref = doc(db, "produtos", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setProduto(data);

        // Busca informações do produtor
        if (data.produtorEmail) {
          const infoProdutor = await getUserProfile(data.produtorEmail);
          setProdutor(infoProdutor);
        }
      } else {
        alert("Produto não encontrado.");
        navigate("/");
      }
    };
    fetchProduto();
  }, [id, navigate]);

  if (!produto)
    return <p style={{ color: "#fff", textAlign: "center" }}>Carregando produto...</p>;

  return (
    <div style={container}>
      <button onClick={() => navigate(-1)} style={btnVoltar}>⬅ Voltar</button>

      {/* Imagens do produto */}
      <div style={galeriaContainer}>
        {produto.imagens && produto.imagens.length > 0 ? (
          <>
            <img
              src={produto.imagens[imagemAtiva]}
              alt={produto.nome}
              style={imagemPrincipal}
            />
            <div style={miniaturas}>
              {produto.imagens.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Imagem ${index + 1}`}
                  style={{
                    ...miniatura,
                    border:
                      imagemAtiva === index
                        ? "2px solid #4CAF50"
                        : "1px solid #444",
                  }}
                  onClick={() => setImagemAtiva(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <div style={{ ...imagemPrincipal, background: "#333" }}>
            <p style={{ color: "#aaa" }}>Sem imagem disponível</p>
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div style={infoBox}>
        <h2 style={{ color: "#d4ed91" }}>{produto.nome}</h2>
        <p style={{ fontSize: "20px" }}>
          <strong>Preço:</strong> R$ {produto.preco.toFixed(2)}
        </p>
        <p>
          <strong>Descrição:</strong> {produto.descricao}
        </p>
        {produto.categoria && (
          <p>
            <strong>Categoria:</strong> {produto.categoria}
          </p>
        )}
      </div>

      {/* Informações do produtor */}
      {produtor && (
        <div style={vendedorBox}>
          <h3 style={{ color: "#d4ed91" }}>Informações do Produtor</h3>
          <p><strong>Nome:</strong> {produtor.nome || "Não informado"}</p>
          <p><strong>Telefone:</strong> {produtor.telefone || "Não informado"}</p>
          {produtor.cidade && (
            <p><strong>Localização:</strong> {produtor.cidade}, {produtor.estado}</p>
          )}
          <p><strong>Email:</strong> {produto.produtorEmail}</p>
          <Link
            to={`/chat/${id}?to=${produto.produtorEmail}`}
            style={btnChat}
          >
            💬 Conversar com o produtor
          </Link>
        </div>
      )}
    </div>
  );
};

// 🎨 estilos
const container = {
  padding: "20px",
  maxWidth: "800px",
  margin: "0 auto",
  color: "#fff",
};

const galeriaContainer = {
  textAlign: "center",
  marginBottom: "20px",
};

const imagemPrincipal = {
  width: "100%",
  maxHeight: "400px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px",
};

const miniaturas = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  flexWrap: "wrap",
};

const miniatura = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
  cursor: "pointer",
};

const infoBox = {
  backgroundColor: "#1f1f1f",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const vendedorBox = {
  backgroundColor: "#1f1f1f",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const btnChat = {
  display: "inline-block",
  marginTop: "10px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
};

const btnVoltar = {
  background: "none",
  border: "none",
  color: "#d4ed91",
  cursor: "pointer",
  fontSize: "16px",
  marginBottom: "10px",
};

export default DetalhesProduto;
