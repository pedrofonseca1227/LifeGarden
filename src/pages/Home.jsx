import React, { useEffect, useState } from "react";
import { getProdutos } from "../services/productService";
import { Link } from "react-router-dom";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProdutos();
      setProdutos(data);
    };
    fetchData();
  }, []);

  // 🧮 Filtro dinâmico local (sem precisar refazer query no Firestore)
  const produtosFiltrados = produtos.filter((p) => {
    const nomeMatch = p.nome?.toLowerCase().includes(busca.toLowerCase());
    const descMatch = p.descricao?.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch =
      categoria === "todos" || p.categoria === categoria;
    const precoMinMatch = precoMin ? p.preco >= parseFloat(precoMin) : true;
    const precoMaxMatch = precoMax ? p.preco <= parseFloat(precoMax) : true;

    return (nomeMatch || descMatch) && categoriaMatch && precoMinMatch && precoMaxMatch;
  });

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2>🌿 Produtos disponíveis</h2>

      {/* 🔍 Filtros */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
          backgroundColor: "#1f1f1f",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar por nome ou descrição..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={inputStyle}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={inputStyle}
        >
          <option value="todos">Todas as categorias</option>
          <option value="Insumos">Insumos</option>
          <option value="Ferramentas">Ferramentas</option>
          <option value="Mudas e Sementes">Mudas e Sementes</option>
          <option value="Alimentos">Alimentos</option>
        </select>

        <input
          type="number"
          placeholder="Preço mínimo"
          value={precoMin}
          onChange={(e) => setPrecoMin(e.target.value)}
          style={{ ...inputStyle, width: "120px" }}
        />

        <input
          type="number"
          placeholder="Preço máximo"
          value={precoMax}
          onChange={(e) => setPrecoMax(e.target.value)}
          style={{ ...inputStyle, width: "120px" }}
        />

        <button
          onClick={() => {
            setBusca("");
            setCategoria("todos");
            setPrecoMin("");
            setPrecoMax("");
          }}
          style={{
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Limpar filtros
        </button>
      </div>

      {/* 🧱 Lista de produtos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {produtosFiltrados.length === 0 ? (
          <p>Nenhum produto encontrado com os filtros aplicados.</p>
        ) : (
          produtosFiltrados.map((p) => <ProdutoCard key={p.id} produto={p} />)
        )}
      </div>
    </div>
  );
};

const ProdutoCard = ({ produto }) => {
  const [index, setIndex] = useState(0);
  const imagens = produto.imagens?.length ? produto.imagens : [produto.imagem];
  const total = imagens.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  return (
    <div
      style={{
        backgroundColor: "#1f1f1f",
        borderRadius: "10px",
        padding: "15px",
        color: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🖼️ Carrossel manual */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img
          src={imagens[index]}
          alt={produto.nome}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "8px",
            transition: "opacity 0.4s ease-in-out",
          }}
        />

        {total > 1 && (
          <>
            <button onClick={prev} style={btnStyle("left")}>‹</button>
            <button onClick={next} style={btnStyle("right")}>›</button>
          </>
        )}
      </div>

      <h3 style={{ margin: "10px 0", color: "#d4ed91" }}>{produto.nome}</h3>
      <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
      <p><strong>Descrição:</strong> {produto.descricao}</p>
      <p style={{ fontSize: "13px", color: "#aaa" }}>
        <em>Categoria:</em> {produto.categoria || "Sem categoria"}
      </p>
      <p style={{ fontSize: "13px", color: "#aaa" }}>
        <em>Produtor:</em> {produto.produtorEmail}
      </p>

      <Link
        to={`/chat/${produto.id}`}
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
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #555",
  backgroundColor: "#2a2a2a",
  color: "#fff",
  flex: "1",
  minWidth: "150px",
};

const btnStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "10px",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0,0,0,0.5)",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "25px",
  height: "25px",
  cursor: "pointer",
  fontSize: "18px",
  lineHeight: "22px",
  textAlign: "center",
  transition: "background-color 0.3s",
});

export default Home;
