import axios from "axios";

const API_BASE_URL = 'https://localhost:7226/api/Order';

export const shoppingCartService = {
    async sendOrder(order, firstname, lastname, phone) {

        const productsMapped = order.map(item => ({
            productId: item.product.productId,
            quantity: item.itemsInCart
          }));
        
          const orderDetails = {
            items: productsMapped,
            firstname: firstname,
            lastname: lastname,
            phone: phone
          }

        const response = await axios.post(`${API_BASE_URL}`, orderDetails);
        return response.data;
    }
};