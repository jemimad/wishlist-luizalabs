# Wishlist Luizalabs

Aplicativo de wishlist com produtos, desenvolvido com Vue 3, Pinia, Vite e uma API mockada com JSON Server.

## 📁 Estrutura do Projeto

```
wishlist-luizalabs/
├── wishlist/           # Front-end
└── api/                # Back-end
```

---

## 🚀 Instruções de Execução

### 1. Clonando o repositório

```bash
git clone https://github.com/jemimad/wishlist-luizalabs.git
cd wishlist-luizalabs
```

### 2. Executando a API

```bash
cd api
npm install
npm start
```

> A API roda por padrão em: `http://localhost:3000/products`

### 3. Executando o Frontend

```bash
cd ../wishlist
yarn install
yarn dev
```

> A aplicação estará disponível em: `http://localhost:5173`

---

## 💡 Tecnologias Utilizadas

- Vue 3 + Vite
- Pinia (Store)
- Vue Router
- Vitest + Vue Test Utils

---

## 🎨 Funcionalidades

- Listagem de produtos
- Adição e remoção de produtos da Wishlist
- Wishlist salva no localStorage
- Mensagens de estado vazio (quando não há produtos ou wishlist)

---

## ✅ Testes

Para rodar os testes unitários:

```bash
yarn test
```
---

## 📆 Sobre

Projeto desenvolvido para fins de avaliação técnica. Implementação focada em:
- Componentização
- Boas práticas de escrita de testes
- Simples e funcional UI

---

