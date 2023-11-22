import { Domicilio } from "../types/Domicilio";

const BASE_URL = 'http://localhost:8080';

export const DomicilioService = {
    getAllDomicilios: async (): Promise<Domicilio[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/domicilios/paged`);
        const data = await response.json();
        return data;
    },

    getDomicilio: async (id: number): Promise<Domicilio> => {
        const response = await fetch(`${BASE_URL}/api/v1/domicilios/${id}`);
        const data = await response.json();
        return data;
    },

    createDomicilio: async (domicilio: Domicilio): Promise<Domicilio> => {
        const response = await fetch(`${BASE_URL}/api/v1/domicilios`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(domicilio)
        });

        const data = await response.json();
        return data;
    },

    updateDomicilio: async (id: number, domicilio: Domicilio): Promise<Domicilio> => {
        const response = await fetch(`${BASE_URL}/api/v1/domicilios/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(domicilio)
        });

        const data = await response.json();
        return data;
    },

    deleteDomicilio: async (id: number): Promise<void> => {

        try {
            // Recuperar el token del localStorage
            //const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/domicilios/${id}`, {
                method: 'DELETE',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log('Respuesta del servidor:', response);


            if (response.status === 204) {
                console.log('Domicilio eliminado correctamente');
                //return;
            } else {
                const data = await response.json();
                console.log('Domicilio eliminado:', data);
            }


            if (!response.ok) {
                throw new Error('Error al eliminar cliente');
            }
        
        


        } catch (error) {
            console.log('Error al eliminar cliente', error);
            throw error;
        }
    },
};
