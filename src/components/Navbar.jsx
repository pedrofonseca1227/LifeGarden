import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>🌿 Life Garden</h1>
      <ul>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/cadastro">Cadastro</Link></li>
          </>
        ) : (
          <>
            <li>Olá, {user.email}</li>
            <li><button onClick={logout}>Sair</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
