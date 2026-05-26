import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/users";

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
});

export const login = async (email, password) => {
    try {
        const response = await instance.post('/login', {email, password});
        localStorage.setItem('userId', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

export const register = async (email, password, name) => {
    try {
        const response = await instance.post('/register',{email, password, name});
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}

export const buscarUsuarios = async (termoBusca, pagina) => {
    try {
        // O Axios vai transformar isso em: /api/users?nome=Guilherme&page=1
        const response = await instance.get('/api/users', {
            params: {
                nome: termoBusca,
                page: pagina
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários: ', error);
        throw error;
    }
};

export const buscarContaDoUsuario = async (userId) => {
    try {
        // Se o userId for 5, a URL fica: /api/accounts/5
        const response = await instance.get(`/api/accounts/${userId}`);

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar conta: ', error);
        throw error;
    }
};