# Front-end Test T4tech

![Version](https://img.shields.io/badge/1.0.0-beta?label=version)
![PoweredBy](https://img.shields.io/badge/powered_by-T4tech-black)
![Vue3](https://img.shields.io/badge/Vue-3.5.13-42b883?style=flat-square&logo=vue.js&logoColor=42b883)
![Vite](https://img.shields.io/badge/Vite-6.0.11-9499ff?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?style=flat-square&logo=tailwindcss&logoColor=38bdf8)

## 🛠️ Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [NodeJS](https://nodejs.org/en/docs/) - Ambiente de execução JavaScript
- [Vue3](https://vuejs.org/) - Framework web with TypeScript
- [Vite](https://vite.dev/) - Framework web with TypeScript
- [Pinia](https://pinia.vuejs.org/) - Framework para gerenciamento de estado.
- [Tailwind CSS](https://tailwindcss.com/docs) - Framework para estilização
- [Jest](https://jestjs.io/pt-BR/) - Framework de Testes.

## 🎯 Requisitos

### Objetivo:

Desenvolver um pequeno projeto do zero com responsividade para Desktop e Mobile.

Pode utilizar um starter para o layout.

### Tecnologias

- [x] TypeScript
- [x] Vite
- [x] Vue 3
- [x] Tailwind
- [?] Tailwind Datatable
- [x] Axios
- [x] Jest (testes)

### Tarefas

Utilizando a API pública da [NBA balldontlie API](https://www.balldontlie.io/), faça um CRUD simples:

- [x] Exiba todos os jogadores dentro de uma datatable;
  - [x] Deve conter um campo de busca dinâmico para filtrar;
  - [x] Ordenação de A-Z | Z-A;
- [x] Ao clicar no botão EDITAR na linha de qualquer jogador na datatable, exiba informações filtradas daquele jogador em uma modal ou nova página;
- [x] Utilize PROMISE para simular editar dados de qualquer jogador;
- [x] Utilize PROMISE para simular deletar um dos jogadores da datatable
  - [x] Deve existir uma caixa de confirmação antes.

### Bônus

- [ ] Utilizar SQLITE para armazenar tudo localmente;
- [x] Criar simulações e padrões para mensagens de erro da API;
- [x] Utilizar DOCKER no projeto.

## 🚀 Get Started!

### 1. Clone o repositório do projeto

```sh
$ git clone git@github.com:dehcanuto/front-t4tech.git
```

### 2. Instale as dependências para o funcionamento do app

```sh
$ yarn
```

### 3. Construa o container no docker

Execute os seguintes comandos para construir a aplicação:

```sh
docker build -t vue-nba-app .
```

## 🔥 Rode a aplicação com o docker

Se estiver usando docker-compose/Docker desktop:

```sh
docker-compose up --build
```

ou docker padrao:

```sh
docker run -p 5173:5173 vue-nba-app
```

### Type-Check, compilação e minimização para produção

```sh
yarn build
```

## 🧪 Tests

### Executar testes unitários com [Jest](https://jestjs.io/)

```sh
yarn test
```

ou use para hot-reload:

```sh
yarn test:watch
```

### Execute testes de End-to-End com [Cypress](https://www.cypress.io/) nativos do Vite

```sh
yarn test:e2e:dev
```

Isso executa os testes de end-to-end no servidor de desenvolvimento Vite. É muito mais rápido do que a compilação de produção.
Mas ainda é recomendado testar a compilação de produção com `test:e2e` antes de implantar (por exemplo, em ambientes de CI):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
