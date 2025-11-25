import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import "../styles/login.css";


const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Se já estiver logado, redireciona automaticamente
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/"); // Redirecionar
    } catch (err) {
      alert("Email ou senha incorretos!");
      console.error(err);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="login-page">

      <h2 className="login-title">Entrar</h2>

      <form className="login-form" onSubmit={handleLogin}>
        
        <input
          type="email"
          className="login-input email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="login-input password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
