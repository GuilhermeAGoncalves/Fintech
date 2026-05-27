# 🚀 Helpfy - Sistema de Gestão Financeira (Fintech)

Bem-vindo ao **Helpfy**, uma aplicação financeira full-stack completa. Este projeto foi construído como parte da graduação em Análise e Desenvolvimento de Sistemas (ADS) da FIAP, aplicando os melhores padrões de mercado para criar uma arquitetura backend escalável e um frontend super interativo.

## 🛠️ Tecnologias Utilizadas

* **Back-end:** Java 21, Spring Boot 4.0.6, Gradle, Banco de Dados Oracle
* **Front-end:** React.js, Vite, Node.js

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

* Java 21
* Node.js & npm
* Acesso ao Banco de Dados Oracle da FIAP

## 🚀 Como Executar o Projeto

### 1. Configuração do Banco de Dados

* Localize o script de criação no diretório: `back-end-fintech/src/main/resources/SQL/CREATE_TABLE.SQL`
* Execute este script no seu banco de dados Oracle da FIAP.

### 2. Variáveis de Ambiente (.env)

1. Faça uma cópia do arquivo `.env_example` e renomeie-o para `.env` no diretório `back-end-fintech`.
2. Preencha com suas credenciais:
DB_USERNAME=seuRM
DB_PASSWORD=suaSenha
DB_HOST=oracle.fiap.com.br
DB_PORT=1521
DB_SID=ORCL

### 3. Iniciando o Back-end (Porta 8080)

1. Abra o terminal e navegue até a pasta `back-end-fintech`.
2. Inicie a aplicação:
   * No Windows: `gradlew.bat bootRun`
   * No Mac/Linux: `./gradlew bootRun`
3. O servidor estará rodando em **http://localhost:8080**.

### 4. Iniciando o Front-end (Porta 5173)

1. Abra uma nova aba no terminal e navegue até a pasta `front-end-fintech`.
2. Instale as dependências:
npm install

3. Inicie o servidor:
npm run dev

4. A interface estará disponível em **http://localhost:5173**.

## 🔐 Dados de Autenticação (Usuário de Teste)

| Campo | Valor |
|-------|-------|
| **Email** | teste@helpfy.com |
| **Senha** | 123456 |

## 📦 Entidades do Sistema

* **Users** - Usuários do sistema
* **Accounts** - Contas bancárias
* **Transactions** - Transações financeiras
* **Categories** - Categorias de transações

## 👨‍💻 Créditos

* **Desenvolvido por:** Guilherme De Araújo Gonçalves | João Lucas De Souza | Lucca Modena | Daher Krishna Gilson
* **Curso:** Análise e Desenvolvimento de Sistemas - FIAP
