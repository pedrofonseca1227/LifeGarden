import React, { useState } from 'react';
import { addProduto, uploadImage } from '../services/productService';
import { useAuth } from '../hooks/useAuth';

const NovoProduto = () => {
  const { user } = useAuth();
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Você precisa estar logado para cadastrar um produto.');
      return;
    }

    try {
      setUploading(true);
      let imageUrl = null;

      if (imagem) {
        imageUrl = await uploadImage(imagem);
      }

      const produto = {
        nome,
        preco: parseFloat(preco),
        descricao,
        imagem: imageUrl,
        produtorEmail: user.email,
        criadoEm: new Date(),
      };

      await addProduto(produto);

      alert('Produto cadastrado com sucesso!');
      setNome('');
      setPreco('');
      setDescricao('');
      setImagem(null);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Cadastrar Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço (R$)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <label style={{ display: 'block', margin: '10px 0' }}>
          Escolher imagem:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={uploading}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {uploading ? 'Enviando...' : 'Cadastrar Produto'}
        </button>
      </form>

      {imagem && (
        <div style={{ marginTop: '15px' }}>
          <p>Pré-visualização:</p>
          <img
            src={URL.createObjectURL(imagem)}
            alt="Pré-visualização"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
};

export default NovoProduto;
