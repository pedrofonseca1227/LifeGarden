import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import "../styles/cadastro.css";

const Cadastro = () => {
  const { register } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(nome, email, password);
      alert("Conta criada com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div className="cadastro-page">
      <h2 className="cadastro-title">Criar Conta</h2>

      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="cadastro-input"
        />

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="cadastro-input"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="cadastro-input"
        />

        <button className="cadastro-button" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
