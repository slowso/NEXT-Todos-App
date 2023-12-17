import axios from 'axios';

export const registerUserService = async (data: { email: string, name: string, password: string }) => {
    try {
        const response = await axios.post('/api/auth/register', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};