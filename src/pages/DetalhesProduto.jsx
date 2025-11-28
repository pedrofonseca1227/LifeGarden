import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getUserProfile } from "../services/userService";
import { getAvaliacoesByProdutor } from "../services/avaliacaoService";
import { useAuth } from "../hooks/useAuth";

import "../styles/detalhesProduto.css";

const DetalhesProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [produto, setProduto] = useState(null);
  const [produtor, setProdutor] = useState(null);
  const [imagemAtiva, setImagemAtiva] = useState(0);

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [mediaEstrelas, setMediaEstrelas] = useState(0);

  useEffect(() => {
    const fetchProduto = async () => {
      const ref = doc(db, "produtos", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setProduto(data);

        if (data.produtorEmail) {
          const infoProdutor = await getUserProfile(data.produtorEmail);
          setProdutor(infoProdutor);

          // Carrega avaliações do produtor
          const avals = await getAvaliacoesByProdutor(data.produtorEmail);
          setAvaliacoes(avals);

          if (avals.length > 0) {
            const soma = avals.reduce((acc, a) => acc + a.nota, 0);
            setMediaEstrelas(soma / avals.length);
          }
        }
      } else {
        alert("Produto não encontrado.");
        navigate("/");
      }
    };

    fetchProduto();
  }, [id, navigate]);

  if (!produto)
    return <p className="detalhes-loading">Carregando produto...</p>;

  const totalAvaliacoes = avaliacoes.length;

  return (
    <div className="detalhes-container">

      <button className="detalhes-voltar" onClick={() => navigate(-1)}>
        ⬅ Voltar
      </button>

      {/* GALERIA */}
      <div className="detalhes-galeria">
        {produto.imagens?.length ? (
          <>
            <img
              src={produto.imagens[imagemAtiva]}
              alt={produto.nome}
              className="detalhes-img-principal"
            />

            <div className="detalhes-miniaturas">
              {produto.imagens.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Imagem ${index + 1}`}
                  className={`detalhes-miniatura ${
                    imagemAtiva === index ? "ativa" : ""
                  }`}
                  onClick={() => setImagemAtiva(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="detalhes-sem-img">
            <p>Sem imagem disponível</p>
          </div>
        )}
      </div>

      {/* INFO DO PRODUTO */}
      <div className="detalhes-info">
        <h2>{produto.nome}</h2>

        {/* ⭐ Média de avaliações */}
        {totalAvaliacoes > 0 ? (
          <p className="detalhes-media">
            ⭐ {mediaEstrelas.toFixed(1)}{" "}
            <span className="detalhes-media-total">
              ({totalAvaliacoes} avaliações)
            </span>
          </p>
        ) : (
          <p className="detalhes-media detalhes-sem-avaliacao">
            ⭐ Nenhuma avaliação ainda
          </p>
        )}

        <p className="detalhes-preco">
          <strong>Preço:</strong> R$ {produto.preco.toFixed(2)}
        </p>

        <p><strong>Descrição:</strong> {produto.descricao}</p>

        {produto.categoria && (
          <p><strong>Categoria:</strong> {produto.categoria}</p>
        )}
      </div>

      {/* INFO DO PRODUTOR */}
      {produtor && (
        <div className="detalhes-produtor">
          <h3>Informações do Produtor</h3>

          <p><strong>Nome:</strong> {produtor.nome || "Não informado"}</p>
          <p><strong>Telefone:</strong> {produtor.telefone || "Não informado"}</p>

          {produtor.cidade && (
            <p>
              <strong>Localização:</strong> {produtor.cidade}, {produtor.estado}
            </p>
          )}

          <p><strong>Email:</strong> {produto.produtorEmail}</p>

          {user ? (
            <Link
              to={`/chat/${id}_${user.email}`}
              className="detalhes-btn-chat"
            >
              💬 Conversar com o produtor
            </Link>
          ) : (
            <button
              className="detalhes-btn-chat detalhes-btn-desabilitado"
              onClick={() => navigate("/login")}
            >
              🔒 Faça login para conversar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DetalhesProduto;
