import React from 'react';

const Cadastro = () => {
  return (
    <div>
      <h2>Criar Conta</h2>
      <form>
        <input type="text" placeholder="Nome completo" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
