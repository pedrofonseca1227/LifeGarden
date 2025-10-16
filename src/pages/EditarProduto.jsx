import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { updateProduto, uploadImage } from '../services/productService';

const EditarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState(null);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Buscar dados atuais do produto
  useEffect(() => {
    const fetchProduto = async () => {
      const produtoRef = doc(db, 'produtos', id);
      const produtoSnap = await getDoc(produtoRef);
      if (produtoSnap.exists()) {
        const data = produtoSnap.data();
        setProduto(data);
        setNome(data.nome);
        setPreco(data.preco);
        setDescricao(data.descricao);
      } else {
        alert('Produto não encontrado.');
        navigate('/meus-produtos');
      }
    };
    fetchProduto();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = produto.imagem || null;

      if (imagem) {
        imageUrl = await uploadImage(imagem);
      }

      const dadosAtualizados = {
        nome,
        preco: parseFloat(preco),
        descricao,
        imagem: imageUrl,
      };

      await updateProduto(id, dadosAtualizados);
      alert('Produto atualizado com sucesso!');
      navigate('/meus-produtos');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!produto) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do produto"
          required
        />
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Preço"
          required
        />
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          required
        />

        <label style={{ display: 'block', marginTop: '10px' }}>
          Alterar imagem:
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
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {uploading ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </form>

      {produto.imagem && (
        <div style={{ marginTop: '15px' }}>
          <p>Imagem atual:</p>
          <img
            src={produto.imagem}
            alt="Imagem atual"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
};

export default EditarProduto;
