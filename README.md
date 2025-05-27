# Sistema de Tarefas - Documentação

## Introdução

Este é um sistema para gerenciar tarefas, permitindo criar, editar, excluir e filtrar tarefas com facilidade.

O projeto utiliza as seguintes tecnologias:

- **Backend**: Node.js, Prisma, TypeScript
- **Banco de Dados**: PostgreSQL
- **Frontend**: React, Ant Design, TypeScript

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do backend.
- **Prisma**: ORM para manipulação de dados no PostgreSQL.
- **TypeScript**: Utilizado tanto no backend quanto no frontend.
- **PostgreSQL**: Banco de dados relacional.
- **React**: Biblioteca para construção da interface de usuário.
- **Ant Design**: Biblioteca de componentes UI para React.

## Estrutura do Projeto

/backend  
├── /src  
│   ├── /controllers # Controladores de lógica para gerenciar as tarefas  
│   ├── /routes      # Rotas para a API  
│   ├── /services    # Lógica de negócios  
│   └── /prisma      # Configuração e interações com o banco de dados  
├── prisma.schema    # Definição do esquema do banco de dados  
├── package.json     # Dependências e scripts do backend  
├── tsconfig.json    # Configuração do TypeScript  
└── .env             # Variáveis de ambiente (conexão com o banco)

/frontend  
├── /src  
│   ├── /pages       # Páginas principais do sistema  
│   ├── /components  # Componentes reutilizáveis  
├── package.json     # Dependências e scripts do frontend  
├── tsconfig.json    # Configuração do TypeScript  
└── .env             # Variáveis de ambiente

## Como Baixar e Usar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/sistema-de-tarefas.git
cd sistema-de-tarefas


2. Backend
2.1. Instalar Dependências

cd backend
npm install

2.3. Configuração das Variáveis de Ambiente

Crie um arquivo .env na pasta /backend com:

DATABASE_URL=mysql://usuario:senha@localhost:3306/tarefa

.4. Gerar Cliente Prisma

npx prisma generate

2.5. Rodar o Backend

npm run dev

O backend estará rodando em http://localhost:4444.
3. Frontend
3.1. Instalar Dependências

cd ../frontend
npm install
npm run dev

## 4. Endpoints da API

| Método | Endpoint      | Descrição                     |
|--------|----------------|-------------------------------|
| GET    | /tasks         | Lista todas as tarefas        |
| POST   | /tasks         | Cria uma nova tarefa          |
| PUT    | /tasks/:id     | Atualiza uma tarefa existente |
| DELETE | /tasks/:id     | Remove uma tarefa             |
| GET    | /tasks?search=texto&status=pendente | Filtra tarefas por título e/ou status |

