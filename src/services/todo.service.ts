import axios from "axios";

export const createTodoService = async (data: string) => {
    try {
        const response = await axios.post(`/api/todo`, { content: data });
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const getTodosService = async () => {
    try {
        const response = await axios.get(`/api/todo`);
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const updateTodoService = async (id: string, data: string) => {
    try {
        const response = await axios.put(`/api/todo`, { content: data, id });
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const deleteTodoService = async (id: string) => {
    try {
        const response = await axios.delete(`/api/todo?id=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    };
};