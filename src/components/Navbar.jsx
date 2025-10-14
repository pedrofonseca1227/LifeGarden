import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🌿 Life Garden</h1>
      <ul>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/cadastro">Cadastro</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
