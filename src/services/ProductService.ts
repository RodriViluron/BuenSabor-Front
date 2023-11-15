
import Producto from "../types/Producto";

const BASE_URL = 'http://localhost:8080/';

export const ProductService = {
    getProducts: async (): Promise<Producto[]> => {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        return data;
    },

    getProduct: async (id: number): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const data = await response.json();
        return data;
    },

    createProduct: async (product: Producto): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/products`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        return data;
    },

    updateProduct: async (id: number, product: Producto): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        return data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/products/${id}`, {
            method: "DELETE"
        });
    }

};
