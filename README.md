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

## 🧱 Arquitetura das Coleções no Firestore

### **Coleção: produtos**
```json
{
  "nome": "Milho Safra 2024",
  "descricao": "Milho selecionado e seco",
  "preco": 120,
  "categoria": "Grãos",
  "produtorEmail": "exemplo@fazenda.com",
  "imagens": ["img1.jpg", "img2.jpg"],
  "createdAt": "timestamp"
}
