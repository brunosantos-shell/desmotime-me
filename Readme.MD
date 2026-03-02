# 💀 Desmotive-Me

<!-- TROQUE OWNER e REPO quando criar -->
![GitHub repo size](https://img.shields.io/github/repo-size/brunosantos-shell/desmotime-me)
![GitHub last commit](https://img.shields.io/github/last-commit/brunosantos-shell/desmotime-me)
![GitHub stars](https://img.shields.io/github/stars/brunosantos-shell/desmotime-me?style=social)
![CI/CD Pipeline](https://github.com/brunosantos-shell/desmotime-me/actions/workflows/deploy.yml/badge.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Node](https://img.shields.io/badge/Node-20-green)

Projeto **Desmotive-Me** rodando com:

- ⚡ Vite (Frontend)
- 🚀 Express (API)
- 🐳 Docker
- 🎲 Endpoint para frase aleatória via `curl`

---

# 📦 Clonar o Projeto

```bash
git clone https://github.com/flaviojmendes/desmotive-me
cd desmotive-me
```
# 🛠 Criar Arquivos Necessários

## 📌 1️⃣ Criar arquivo de frases

Criar o arquivo: desmotive-me/src/quotes.js

Conteúdo:

```js
export const quotes = [
"Quando a vida parecer difícil lembre-se que tudo pode piorar.",
"Agora e daqui pra frente, é só ladeira abaixo.",
"Não desanime, a derrota de hoje nem se compara com a de amanhã.",
"Lute como nunca, perca como sempre.",
"Seja o protagonista do seu fracasso.",
"Tudo pode acontecer, inclusive nada.",
"Não pare, faça até dar errado."
]
```

## 📌 2️⃣ Criar servidor da API


Criar o arquivo desmotive-me/server.js

```js
import express from "express"
import { quotes } from "./src/quotes.js"

const app = express()
const port = 3001

function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

app.get("/api/frase", (req, res) => {
  res.json({
    frase: randomQuote()
  })
})

app.listen(port, "0.0.0.0", () => {
  console.log("API rodando na porta", port)
})
```

# 🐳Docker Setup

## 📌 Dockerfile

Criar o arquivo desmotive-me/Dockerfile

```docker
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install
RUN yarn add express

COPY . .

EXPOSE 5173
EXPOSE 3001

CMD sh -c "node server.js & yarn run dev --host"
```

## 📌 docker-compose.yaml

Criar na raiz do projeto o docker-compose.yaml

```yaml
services:
  desmotive-me:
    container_name: desmotive-me
    build:
      context: ./desmotive-me
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
      - "3001:3001"
    volumes:
      - ./desmotive-me:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    restart: unless-stopped
```

## ▶️ Executar com Docker

```bash
docker compose down -v
docker compose up --build -d
docker compose logs -f
```

## 🌐 Acessos

### Frontend

http://localhost:5173

### API (Frase Aleatória)

```bash
curl http://localhost:3001/api/frase
{"frase":"Lute como nunca, perca como sempre."}
```

Cada chamada retorna uma frase diferente 🎲

## ⛔ Parar o Ambiente

```bash
docker compose down
```

Reset completo:

```
docker compose down -v
```