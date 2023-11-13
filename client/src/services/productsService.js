import axios from "axios";

const API_BASE_URL = 'https://localhost:7226/api/Product';

export const productsService = {
    async getProducts() {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    }
};