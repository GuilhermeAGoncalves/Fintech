# 🚀 Helpfy - Sistema de Gestão Financeira (Fintech)

Bem-vindo ao **Helpfy**, uma aplicação financeira full-stack completa. Este projeto foi construído como parte da graduação em Análise e Desenvolvimento de Sistemas (ADS) da FIAP, aplicando os melhores padrões de mercado para criar uma arquitetura backend escalável e um frontend super interativo.

## 🛠️ Tecnologias Utilizadas
* **Back-end:** Java 17, Spring Boot, Gradle, Banco de Dados Oracle
* **Front-end:** React.js, Vite, Node.js

## ⚙️ Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
* Java 17
* Node.js & npm
* Acesso a um Banco de Dados Oracle

## 🚀 Como Executar o Projeto

### 1. Configuração do Banco de Dados
O primeiro passo é preparar o banco de dados Oracle criando as tabelas:
* Localize o script de criação no diretório: `back-end-fintech/src/main/resources/SQL/CREATE_TABLE.SQL`
* Execute este script no seu banco de dados Oracle.

### 2. Variáveis de Ambiente (.env)
Você precisará configurar as variáveis para a conexão com o banco e demais integrações.
1. Faça uma cópia do arquivo `.env_example` e renomeie-o para `.env` no diretório raiz do projeto.
2. Abra o arquivo `.env` recém-criado e adicione suas credenciais de acesso do Oracle:
    * **Usuário:** Insira o seu **RM da FIAP**.
    * **Senha:** Insira a senha do seu usuário.

### 3. Iniciando o Back-end (Porta 8080)
A API foi desenvolvida em Spring Boot e utiliza o Gradle wrapper, não exigindo instalação global do Gradle.
1. Abra o terminal e navegue até a pasta `back-end-fintech`.
2. Inicie a aplicação executando:
    * No Windows: `gradlew.bat bootRun`
    * No Mac/Linux: `./gradlew bootRun`
3. O servidor back-end estará rodando em **http://localhost:8080**.

### 4. Iniciando o Front-end (Porta 5173)
O front-end utiliza React com Vite para garantir uma performance incrível.
1. Abra uma nova aba no terminal e navegue até a pasta do front-end: `front-end-fintech/helpfy-react/`
2. Instale as dependências do projeto executando o comando:
   ```bash
   npm i
   ```
3. Em seguida, inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. A interface estará disponível no seu navegador em **http://localhost:5173**.

## 👨‍💻 Créditos
* **Desenvolvido por:** Guilherme De Araújo Gonçalves
* **Cargo:** Back-End Developer Pleno | Estudante de ADS na FIAP

---
*Gostou do projeto? Sinta-se à vontade para interagir, enviar sugestões ou conectar-se comigo no LinkedIn!*