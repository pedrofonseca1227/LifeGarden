import React, { useEffect, useState } from 'react';
import { getProdutos } from '../services/productService';

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProdutos();
      setProdutos(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Produtos disponíveis 🌿</h2>
      <div>
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado ainda.</p>
        ) : (
          produtos.map((p) => (
            <div key={p.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{p.nome}</h3>
              <p><strong>Preço:</strong> R$ {p.preco.toFixed(2)}</p>
              <p><strong>Descrição:</strong> {p.descricao}</p>
              <p><em>Anunciado por:</em> {p.produtorEmail}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
