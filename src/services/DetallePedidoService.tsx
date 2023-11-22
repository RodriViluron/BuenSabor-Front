import { DetallePedido } from "../types/DetallePedido";

const BASE_URL = 'http://localhost:8080';

export const DetallePedidoService = {
    
    getAllDetallesPedido: async (): Promise<DetallePedido[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/pedidos/verDetallePedido`);
        const data = await response.json();
        return data;
    },

    getDetallePedido: async (id: number): Promise<DetallePedido> => {
        const response = await fetch(`${BASE_URL}/api/v1/pedidos/verDetallePedido/${id}`);
        const data = await response.json();
        return data;
    },

    createDetallePedido: async (detallesPedido: DetallePedido): Promise<DetallePedido> => {
        const response = await fetch(`${BASE_URL}/api/v1/detallePedido`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(detallesPedido)
        });

        const data = await response.json();
        return data;
    },

    updateDetallePedido: async (id: number, detallePedido: DetallePedido): Promise<DetallePedido> => {
        const response = await fetch(`${BASE_URL}/api/v1/detallePedido/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(detallePedido)
        });

        const data = await response.json();
        return data;
    },

    deleteDetallePedido: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/detallePedido/${id}`, {
            method: "DELETE"
        });
    }
}
