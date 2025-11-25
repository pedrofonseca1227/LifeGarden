import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { saveUserProfile, getUserProfile } from "../services/userService";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import "../styles/perfil.css";

const Perfil = () => {
  const { user } = useAuth();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [salvando, setSalvando] = useState(false);

  // estados para alteração de e-mail
  const [modalEmailAberto, setModalEmailAberto] = useState(false);
  const [novoEmail, setNovoEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [alterandoEmail, setAlterandoEmail] = useState(false);

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
    if (!user) return;

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

  const abrirModalEmail = () => {
    setNovoEmail(user?.email || "");
    setSenhaAtual("");
    setModalEmailAberto(true);
  };

  const fecharModalEmail = () => {
    if (alterandoEmail) return;
    setModalEmailAberto(false);
    setNovoEmail("");
    setSenhaAtual("");
  };

  const handleAlterarEmail = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Usuário não encontrado. Faça login novamente.");
      return;
    }

    if (!novoEmail || !senhaAtual) {
      alert("Preencha o novo e-mail e a senha atual.");
      return;
    }

    try {
      setAlterandoEmail(true);

      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser || !currentUser.email) {
        alert("Não foi possível obter o usuário atual. Faça login novamente.");
        setAlterandoEmail(false);
        return;
      }

      // 1) Reautenticação com senha
      const cred = EmailAuthProvider.credential(currentUser.email, senhaAtual);
      await reauthenticateWithCredential(currentUser, cred);

      // 2) Atualiza e-mail no Firebase Auth
      await updateEmail(currentUser, novoEmail);

      // 3) (opcional) Atualizar perfil na coleção também com o novo e-mail
      await saveUserProfile(novoEmail, {
        nome,
        telefone,
        cidade,
        estado,
        tipo: "produtor",
      });

      alert("✅ E-mail atualizado com sucesso! Você pode precisar fazer login novamente.");
      setAlterandoEmail(false);
      fecharModalEmail();
    } catch (error) {
      console.error("Erro ao alterar e-mail:", error);
      let msg = "Erro ao alterar e-mail.";

      if (error.code === "auth/wrong-password") {
        msg = "Senha incorreta. Tente novamente.";
      } else if (error.code === "auth/invalid-email") {
        msg = "E-mail inválido. Verifique o formato.";
      } else if (error.code === "auth/email-already-in-use") {
        msg = "Este e-mail já está sendo usado por outra conta.";
      } else if (error.code === "auth/requires-recent-login") {
        msg =
          "Por segurança, faça login novamente e tente alterar o e-mail de novo.";
      }

      alert(msg);
      setAlterandoEmail(false);
    }
  };

  if (!user)
    return (
      <p className="perfil-alert">
        Faça login para acessar seu perfil.
      </p>
    );

  return (
    <>
      <div className="perfil-container">
        <h2 className="perfil-title">Meu Perfil</h2>

        <form className="perfil-form" onSubmit={handleSave}>
          {/* SEÇÃO — LOGIN E SEGURANÇA */}
          <h3 className="perfil-section-title">Login e segurança</h3>

          <div className="perfil-email-row">
            <div>
              <p className="perfil-email-label">E-mail de acesso</p>
              <p className="perfil-email-value">{user.email}</p>
            </div>
            <button
              type="button"
              className="perfil-email-button"
              onClick={abrirModalEmail}
            >
              Alterar e-mail
            </button>
          </div>

          {/* SEÇÃO — DADOS PESSOAIS */}
          <h3 className="perfil-section-title">Informações pessoais</h3>
          <div className="perfil-grid">
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="perfil-input"
            />

            <input
              type="tel"
              placeholder="Telefone / WhatsApp"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              className="perfil-input"
            />
          </div>

          {/* SEÇÃO — ENDEREÇO */}
          <h3 className="perfil-section-title">Endereço</h3>
          <div className="perfil-grid">
            <input
              type="text"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="perfil-input"
            />

            <input
              type="text"
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="perfil-input"
            />
          </div>

          <button type="submit" disabled={salvando} className="perfil-button">
            {salvando ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>

      {/* MODAL DE ALTERAÇÃO DE E-MAIL */}
      {modalEmailAberto && (
        <div className="perfil-modal-backdrop">
          <div className="perfil-modal">
            <h3>Alterar e-mail de acesso</h3>

            <form onSubmit={handleAlterarEmail} className="perfil-modal-form">
              <label className="perfil-modal-label">
                Novo e-mail
                <input
                  type="email"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  className="perfil-input"
                  required
                />
              </label>

              <label className="perfil-modal-label">
                Senha atual
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  className="perfil-input"
                  required
                />
              </label>

              <div className="perfil-modal-actions">
                <button
                  type="button"
                  className="perfil-modal-cancelar"
                  onClick={fecharModalEmail}
                  disabled={alterandoEmail}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="perfil-modal-confirmar"
                  disabled={alterandoEmail}
                >
                  {alterandoEmail ? "Alterando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Perfil;
