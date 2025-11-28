import React, { useEffect, useState } from "react";
import { getProdutos } from "../services/productService";
import { getUserProfile } from "../services/userService";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProdutos();

      // Buscar nome do produtor
      const produtosComNome = await Promise.all(
        data.map(async (p) => {
          if (!p.produtorEmail) return p;

          const perfil = await getUserProfile(p.produtorEmail);
          return {
            ...p,
            produtorNome: perfil?.nome || p.produtorEmail, // fallback
          };
        })
      );

      setProdutos(produtosComNome);
    };

    fetchData();
  }, []);

  const produtosFiltrados = produtos.filter((p) => {
    const nomeMatch = p.nome?.toLowerCase().includes(busca.toLowerCase());
    const descMatch = p.descricao?.toLowerCase().includes(busca.toLowerCase());
    const precoMinMatch = precoMin ? p.preco >= parseFloat(precoMin) : true;
    const precoMaxMatch = precoMax ? p.preco <= parseFloat(precoMax) : true;

    return (nomeMatch || descMatch) && precoMinMatch && precoMaxMatch;
  });

  return (
    <div className="home-container">

      {/* BANNER */}
      <section className="hero-banner"></section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="home-steps">
        <div className="home-step">
          <span className="home-step-icon">🔍</span>
          <h3>1. Encontre</h3>
          <p>Veja os produtos disponíveis perto de você.</p>
        </div>
        <div className="home-step">
          <span className="home-step-icon">💬</span>
          <h3>2. Converse</h3>
          <p>Fale diretamente com o produtor.</p>
        </div>
        <div className="home-step">
          <span className="home-step-icon">🤝</span>
          <h3>3. Combine</h3>
          <p>Vocês definem valores e entrega.</p>
        </div>
      </section>

      {/* FILTROS */}
      <h3 className="home-filters-title">Filtre os produtos</h3>
      <div className="home-filters">

        <input
          type="text"
          placeholder="Buscar por nome ou descrição..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="filter-input"
        />

        <input
          type="number"
          placeholder="Preço mínimo"
          value={precoMin}
          onChange={(e) => setPrecoMin(e.target.value)}
          className="filter-input"
        />

        <input
          type="number"
          placeholder="Preço máximo"
          value={precoMax}
          onChange={(e) => setPrecoMax(e.target.value)}
          className="filter-input"
        />

        <button
          onClick={() => {
            setBusca("");
            setPrecoMin("");
            setPrecoMax("");
          }}
          className="filter-button"
        >
          Limpar filtros
        </button>
      </div>

      {/* GRID */}
      <div id="produtos" className="home-grid">
        {produtosFiltrados.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
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

  return (
    <Link
      to={`/produto/${produto.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="produto-card">

        <div className="carousel-container">
          <img src={imagens[index]} alt={produto.nome} className="carousel-img" />

          {total > 1 && (
            <>
              <button
                className="carousel-btn left"
                onClick={(e) => {
                  e.preventDefault();
                  setIndex((prev) => (prev - 1 + total) % total);
                }}
              >
                ‹
              </button>

              <button
                className="carousel-btn right"
                onClick={(e) => {
                  e.preventDefault();
                  setIndex((prev) => (prev + 1) % total);
                }}
              >
                ›
              </button>
            </>
          )}
        </div>

        <h3 className="produto-titulo">{produto.nome}</h3>
        <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>

        {/* 👇 AGORA MOSTRA O NOME DO PRODUTOR */}
        <p className="produto-info">
          <em>Produtor: </em> {produto.produtorNome || "Não informado"}
        </p>

        <p className="produto-cta">Clique para ver mais detalhes</p>
      </div>
    </Link>
  );
};

export default Home;
