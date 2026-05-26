import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/transactions";

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
});

export const login = async (email, password) => {
    try {
        const response = await instance.post('/create', {email, password});
        localStorage.setItem('userId', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};
