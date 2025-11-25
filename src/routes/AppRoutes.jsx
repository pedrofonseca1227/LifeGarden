import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Sobre from "../pages/Sobre";
import NovoProduto from "../pages/NovoProduto";
import MeusProdutos from "../pages/MeusProdutos";
import EditarProduto from "../pages/EditarProduto";
import Chat from "../pages/Chat";
import Conversas from "../pages/Conversas";
import Perfil from "../pages/Perfil";
import DetalhesProduto from "../pages/DetalhesProduto";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/novo-produto" element={<NovoProduto />} />
          <Route path="/meus-produtos" element={<MeusProdutos />} />
          <Route path="/editar-produto/:id" element={<EditarProduto />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/produto/:id" element={<DetalhesProduto />} />
          <Route path="/conversas" element={<Conversas />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Route>

        {/* Rotas SEM layout fixo */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

      </Routes>
    </BrowserRouter>
  );
}
