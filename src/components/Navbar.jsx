import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/navbar.css";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">

        {/* ESQUERDA */}
        <div className="navbar-left">
          <img src={Logo} alt="Logo Life Garden" className="navbar-logo" />
          <h1 className="navbar-title">Life Garden</h1>
        </div>

        {/* CENTRO — MENU DESKTOP */}
        <div className="navbar-center">
          <ul className="navbar-ul">
            <li><Link className="navbar-link" to="/">Início</Link></li>

            {user && (
              <>
                <li><Link className="navbar-link" to="/novo-produto">Novo Produto</Link></li>
                <li><Link className="navbar-link" to="/meus-produtos">Meus Produtos</Link></li>
                <li><Link className="navbar-link" to="/perfil">Meu Perfil</Link></li>
                <li><Link className="navbar-link" to="/conversas">Minhas Conversas</Link></li>
              </>
            )}

            <li><Link className="navbar-link" to="/sobre">Sobre</Link></li>

            {!user && (
              <>
                <li><Link className="navbar-link" to="/login">Login</Link></li>
                <li><Link className="navbar-link" to="/cadastro">Cadastro</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* DIREITA */}
        <div className="navbar-right">
          {user && (
            <>
              <span className="user-badge">👤 {user.email}</span>
              <button
                className="navbar-button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sair
              </button>
            </>
          )}

          <span className="navbar-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </span>
        </div>

      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <ul className="navbar-ul-mobile">
          <li><Link className="navbar-link" to="/" onClick={() => setMenuOpen(false)}>Início</Link></li>

          {user && (
            <>
              <li><Link className="navbar-link" to="/novo-produto" onClick={() => setMenuOpen(false)}>Novo Produto</Link></li>
              <li><Link className="navbar-link" to="/meus-produtos" onClick={() => setMenuOpen(false)}>Meus Produtos</Link></li>
              <li><Link className="navbar-link" to="/perfil" onClick={() => setMenuOpen(false)}>Meu Perfil</Link></li>
              <li><Link className="navbar-link" to="/conversas" onClick={() => setMenuOpen(false)}>Minhas Conversas</Link></li>
            </>
          )}

          <li><Link className="navbar-link" to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link></li>

          {!user ? (
            <>
              <li><Link className="navbar-link" to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link className="navbar-link" to="/cadastro" onClick={() => setMenuOpen(false)}>Cadastro</Link></li>
            </>
          ) : (
            <>
              <li className="user-badge">👤 {user.email}</li>
              <li>
                <button className="navbar-button" onClick={() => { logout(); setMenuOpen(false); }}>
                  Sair
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default Navbar;
