import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      
      {/* Seção de informações da empresa */}
      <div className="footer-section">
        <h3 className="footer-title">Life Garden</h3>
        <p className="footer-text">
          Conectando pequenos produtores a consumidores, revendedores e
          comerciantes. Tecnologia a favor do agro 🌱
        </p>
      </div>

      {/* Seção de contato */}
      <div className="footer-section">
        <h4 className="footer-subtitle">Contato</h4>
        <p className="footer-info">📞 (11) 3456-7890</p>
        <p className="footer-info">📞 (11) 99876-4321 (WhatsApp)</p>
        <p className="footer-info">📧 suporte@lifegarden.com.br</p>
      </div>

      {/* Seção institucional */}
      <div className="footer-section">
        <h4 className="footer-subtitle">Institucional</h4>
        <p className="footer-info">🏢 Life Garden Marketplace LTDA</p>
        <p className="footer-info">CNPJ: 12.345.678/0001-90</p>
        <p className="footer-info">📍 São Paulo - SP</p>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Life Garden — Todos os direitos reservados 🌾
      </div>
    </footer>
  );
};

export default Footer;
