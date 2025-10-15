import React, { useState } from 'react';
import { addProduto } from '../services/productService';
import { useAuth } from '../hooks/useAuth';

const NovoProduto = () => {
  const { user } = useAuth();
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Você precisa estar logado para cadastrar um produto.');
      return;
    }

    const produto = {
      nome,
      preco: parseFloat(preco),
      descricao,
      produtorEmail: user.email,
    };

    try {
      await addProduto(produto);
      alert('Produto cadastrado com sucesso!');
      setNome('');
      setPreco('');
      setDescricao('');
    } catch (error) {
      alert('Erro ao cadastrar produto: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default NovoProduto;
