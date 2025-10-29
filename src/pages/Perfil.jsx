import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { saveUserProfile, getUserProfile } from "../services/userService";

const Perfil = () => {
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const dados = await getUserProfile(user.email);
        if (dados) {
          setNome(dados.nome || "");
          setTelefone(dados.telefone || "");
          setCidade(dados.cidade || "");
          setEstado(dados.estado || "");
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSalvando(true);
    await saveUserProfile(user.email, {
      nome,
      telefone,
      cidade,
      estado,
      tipo: "produtor",
    });
    setSalvando(false);
    alert("✅ Perfil atualizado com sucesso!");
  };

  if (!user) return <p style={{ color: "#fff" }}>Faça login para acessar.</p>;

  return (
    <div style={{ padding: "20px", color: "#fff", maxWidth: "500px", margin: "auto" }}>
      <h2>Meu Perfil</h2>
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="Telefone / WhatsApp"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          disabled={salvando}
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {salvando ? "Salvando..." : "Salvar Perfil"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #555",
  backgroundColor: "#2a2a2a",
  color: "#fff",
};

export default Perfil;
