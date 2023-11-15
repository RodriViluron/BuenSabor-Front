import { Producto } from "../types/Producto";
const BASE_URL = 'http://localhost:8088'
export const ProductoService = {

    //get all
    getProductos: async (): Promise<Producto[]> => {
        const response = await fetch(`${BASE_URL}/api/productos/all`);
        const data = await response.json();
        return data;

    },
    //getone
    getProducto: async (id: number): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/productos/${id}`)
        const data = await response.json();
        return data;

    },
    searchProducto: async (filter: string): Promise<Producto[]> => {
        const response = await fetch(`${BASE_URL}/api/productos/search?filtro=${filter}`)
        const data = await response.json();
        return data;
    }

}
//http://localhost:8088/api/productos/search?filtro=
