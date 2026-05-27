# 🚀 Helpfy - Fintech Management System

Welcome to **Helpfy**, a comprehensive full-stack financial management application. This project was developed as a robust academic milestone for the Analysis and Systems Development (ADS) program at FIAP, designed to demonstrate scalable backend architecture and an interactive frontend.

## 🛠️ Tech Stack
* **Backend:** Java 17, Spring Boot, Gradle, Oracle Database
* **Frontend:** React.js, Vite, Node.js

## ⚙️ Prerequisites
Ensure you have the following installed before running the project:
* Java 17
* Node.js & npm
* Oracle Database environment

## 🚀 How to Run the Project

### 1. Database Setup
To initialize the database, execute the provided SQL script to create the necessary tables in your Oracle DB:
* **File path:** `back-end-fintech/src/main/resources/SQL/CREATE_TABLE.SQL`

### 2. Environment Variables (.env)
You need to configure your environment variables to connect to the database.
1. Make a copy of the `.env_example` file and rename it to `.env` in the respective directory.
2. Open `.env` and fill in your Oracle Database credentials (use your **FIAP RM** as the username and your corresponding password).

### 3. Running the Backend (Port 8080)
The backend is built with Spring Boot and uses the Gradle wrapper.
1. Open a terminal and navigate to the `back-end-fintech` folder.
2. Run the application using Gradle:
    * On Windows: `gradlew.bat bootRun`
    * On Mac/Linux: `./gradlew bootRun`
3. The API will start successfully on **http://localhost:8080**.

### 4. Running the Frontend (Port 5173)
The frontend is a fast and modern React application powered by Vite.
1. Open a new terminal and navigate to the frontend directory: `front-end-fintech/helpfy-react/`
2. Install the necessary dependencies:
   ```bash
   npm i
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The application will be accessible at **http://localhost:5173**.

## 👨‍💻 Credits
* **Developed by:** Guilherme De Araújo Gonçalves | João Lucas De Souza | Lucca Modena | Daher Krishna Gilson 
* **Role:** Back-End Developer & ADS Student at FIAP

---
*If you found this project interesting or helpful, feel free to connect with me on LinkedIn and check out my other repositories!*