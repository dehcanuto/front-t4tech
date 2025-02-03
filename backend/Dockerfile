FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "server.js"]
