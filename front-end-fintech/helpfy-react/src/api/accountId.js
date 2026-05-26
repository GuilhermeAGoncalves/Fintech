import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/transactions";

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
});


export const createAccount = async (userid, name, initialBalance, accountType, color, isActive) => {
    try {
        const response = await instance.post(`/${userid}`, {name, initialBalance, accountType, color, isActive});
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};