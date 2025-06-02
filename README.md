# RecLivros - Front-End

Este é o front-end do sistema de recomendações de livros **RecLivros**, desenvolvido em React.js.

## 📋 Requisitos

- Node.js (versão recomendada: 18+)
- npm (ou yarn)

## 🚀 Instalação

Clone o repositório e instale as dependências:

git clone https://github.com/seu-usuario/reclivros-frontend.git  
cd reclivros-frontend  
npm install

## 🧪 Executando em ambiente de desenvolvimento

npm start

A aplicação estará disponível em: http://localhost:3000

## 🧱 Estrutura

- src/components: Componentes reutilizáveis como barra de busca, ícones, cabeçalho etc.  
- src/pages: Páginas principais da aplicação.  
- src/styles: Arquivos CSS separados para cada componente.

## 🔐 Autenticação

O token de autenticação JWT é salvo no localStorage.  
O logout remove o token e redireciona o usuário para a tela de login.

## 🔄 Comunicação com o back-end

O front-end consome a API REST do back-end em Java (Spring Boot) para buscar livros, avaliar, e gerar recomendações.

## 📄 Licença

Este projeto é acadêmico e não possui licença de uso comercial.
