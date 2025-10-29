import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Cadastro from '../pages/Cadastro.jsx';
import Sobre from '../pages/Sobre.jsx';
import NovoProduto from '../pages/NovoProduto.jsx';
import MeusProdutos from '../pages/MeusProdutos';
import EditarProduto from '../pages/EditarProduto';
import Chat from '../pages/Chat';
import Conversas from "../pages/Conversas";
import Perfil from '../pages/Perfil.jsx';
import DetalhesProduto from '../pages/DetalhesProduto.jsx';


const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/novo-produto" element={<NovoProduto />} />
          <Route path="/meus-produtos" element={<MeusProdutos />} />
          <Route path="/editar-produto/:id" element={<EditarProduto />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/conversas" element={<Conversas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/produto/:id" element={<DetalhesProduto />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
