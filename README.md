Front-end Test T4tech

![Version](https://img.shields.io/badge/1.0.0-beta?label=version)
![PoweredBy](https://img.shields.io/badge/powered_by-Sua%20Obra%20Online-788bff)
![Vue3](https://img.shields.io/badge/Vue-3.5.13-42b883?style=flat-square&logo=vue.js&logoColor=42b883)
![Vite](https://img.shields.io/badge/Vite-6.0.11-9499ff?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?style=flat-square&logo=tailwindcss&logoColor=38bdf8)

## 🛠️ Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

*  [NodeJS](https://nodejs.org/en/docs/) - Ambiente de execução JavaScript
*  [Vue3](https://vuejs.org/) - Framework web with TypeScript
*  [Vite](https://vite.dev/) - Framework web with TypeScript
*  [Pinia](https://pinia.vuejs.org/) - Framework para gerenciamento de estado.
*  [Tailwind CSS](https://tailwindcss.com/docs) - Framework para estilização

## 🎯 Requisitos

### Objetivo: 

Desenvolver um pequeno projeto do zero com responsividade para Desktop e Mobile. 

Pode utilizar um starter para o layout.

### Tecnologias

- [ ] Vue 3
- [ ] TypeScript
- [ ] Tailwind
- [ ] Vite 
- [ ] Axios
- [ ] Jest(testes)
- [ ] Tailwind Datatable.

### Tarefas
Utilizando a API pública da NBA balldontlie API, faça um CRUD simples:

- [ ] Exiba todos os jogadores dentro de uma datatable (deve conter um campo de busca dinâmico para filtrar e ordenação de A-Z | Z-A);
- [ ] Ao clicar no botão EDITAR na linha de qualquer jogador na datatable, exiba informações filtradas daquele jogador em uma modal ou nova página;
- [ ] Utilize PROMISE para simular editar dados de qualquer jogador;
- [ ] Utilize PROMISE para simular deletar um dos jogadores da datatable (deve existir uma caixa de confirmação antes).

### Bônus

- [ ] Utilizar SQLITE para armazenar tudo localmente;
- [ ] Criar simulações e padrões para mensagens de erro da API;
- [ ] Utilizar DOCKER no projeto.

## 🚀 Get Started!

### 1. Clone o repositório do projeto

```bash
$ git clone git@github.com:dehcanuto/front-t4tech.git
```

### 2. Instale as dependências para o funcionamento do app

```bash
$ yarn install
```

## 🔥 Rode a aplicação

### Compila e usa Hot-Reload para ambiente de desenvolvimento

```sh
yarn dev
```

O projeto será apresentado através do link [http://localhost:3000](http://localhost:3000).

### Type-Check, compilação e minimização para produção

```sh
yarn build
```

## 🧪 Tests

### Executar testes unitários com [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Execute testes de End-to-End com [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

Isso executa os testes de end-to-end no servidor de desenvolvimento Vite.
É muito mais rápido do que a compilação de produção.

Mas ainda é recomendado testar a compilação de produção com `test:e2e` antes de implantar (por exemplo, em ambientes de CI):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```