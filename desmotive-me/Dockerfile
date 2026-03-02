FROM node:20-alpine

# Diretório da aplicação
WORKDIR /desmotive-me

# Copia apenas arquivos de dependência primeiro (melhora cache)
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install

# Instala express caso não esteja no package.json
RUN yarn add express

# Copia restante do projeto
COPY . .

# Expõe a porta padrão (ajuste se necessário)
EXPOSE 5173
EXPOSE 3001

# Comando padrão
CMD sh -c node server.js & yarn run dev --host"
md