import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useAuth } from "../hooks/useAuth";

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

      // Redireciona imediatamente após o Firebase autenticar
      navigate("/");
    } catch (err) {
      alert("Email ou senha incorretos!");
      console.error(err);
    }
  };

  // Evita página piscando enquanto Firebase carrega
  if (loading) return <p>Carregando...</p>;

  return (
    <div className="login-container">
      <h2>Entrar</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
