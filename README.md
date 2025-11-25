# 🌿 Life Garden — Marketplace Rural Inteligente

O **Life Garden** é um marketplace moderno que conecta **produtores rurais** a **compradores e revendedores**, oferecendo uma plataforma simples, eficiente e segura para anunciar, negociar e avaliar produtos agropecuários.

O projeto foi desenvolvido utilizando **React + Firebase**, com foco em performance, escalabilidade e experiência do usuário.

---

## 🚀 Tecnologias Utilizadas

### **Front-end**
- ⚛️ React.js (Vite)
- 🎨 CSS moderno e responsivo
- 📦 Context API (autenticação global)
- 🔄 React Router DOM (rotas)

### **Back-end / Serviços**
- 🔥 Firebase Authentication
- 🔥 Firebase Firestore
- 🔥 Firebase Storage
- Real-time updates através de snapshots

---

## 📌 Funcionalidades Principais

### 👤 **Autenticação**
- Login e cadastro de usuários
- Salvamento de perfil completo no Firestore
- Atualização de informações pessoais
- Troca segura de e-mail com reautenticação

### 🛒 **Produtos**
- Cadastro de novos produtos (com múltiplas imagens)
- Edição e remoção
- Listagem global com filtros:
  - Nome / Descrição  
  - Preço mínimo / máximo
- Visualização detalhada com galeria de imagens
- Exibição do produtor + média de avaliações ⭐

### 💬 **Chat em Tempo Real**
- Chats individuais baseados no produto:  
  **`produtoId_emailDoComprador`**
- Mensagens só podem ser lidas por comprador e produtor  
  (validação de segurança implementada)
- Atualização instantânea via Firestore
- Exclusão de conversa disponível para as duas partes
- Listagem de conversas recentes com preview da última mensagem

### ⭐ **Avaliações**
- Cada produtor pode ser avaliado por compradores
- Sistema de notas (1–5 estrelas)
- Comentários opcionais
- Média de avaliações exibida na página do produto

### 📱 **Responsividade**
- Interface adaptada para desktop, tablet e mobile
- Layout limpo com foco em usabilidade

---
🛠 Como Rodar o Projeto
1. Clonar o repositório
git clone https://github.com/pedrofonseca1227/LifeGarden.git
cd LifeGarden

2. Instalar dependências
npm install

3. Criar arquivo .env.local

Configure as credenciais do Firebase:

VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx

4. Rodar em modo desenvolvimento
npm run dev

📂 Estrutura Simplificada do Projeto
src/
 ├── components/
 ├── pages/
 ├── services/
 │    ├── messageService.js
 │    ├── avaliacaoService.js
 │    ├── productService.js
 │    └── userService.js
 ├── styles/
 └── AppRoutes.jsx

🎯 Objetivo do Projeto

O Life Garden foi criado para:

Facilitar a venda de produtos rurais

Aproximar produtores e compradores

Simplificar negociações

Fortalecer pequenos produtores através da tecnologia

📝 Licença

Este projeto é de uso acadêmico e demonstrativo. Todos os direitos reservados.
