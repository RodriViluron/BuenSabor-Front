import {UnidadMedida} from "../types/UnidadMedida";

const BASE_URL = 'http://localhost:8080';

export const UnidadMedidaService = {

    getUnidadMedidas: async (): Promise<UnidadMedida[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/UnidadMedida`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Error al recuperar datos');
            }
    
            const data = await response.json();
            console.log('Datos recuperados:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al recuperar datos');
            throw error;
        }
    },

    getUnidadMedida: async (id: number): Promise<UnidadMedida[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/UnidadMedida/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Error al recuperar dato');
            }
    
            const data = await response.json();
            console.log('Dato recuperado:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al recuperar dato');
            throw error;
        }
    },


    createUnidadMedida: async (unidadmedida : UnidadMedida): Promise<UnidadMedida[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/UnidadMedida`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(unidadmedida)
            });
    
            if (!response.ok) {
                throw new Error('Error al crear UnidadMedida');
            }
    
            const data = await response.json();
            console.log('UnidadMedida creado:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al crear UnidadMedida');
            throw error;
        }
    },


    updateUnidadMedida: async (id: number, unidadmedida : UnidadMedida): Promise<UnidadMedida[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/UnidadMedida/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(unidadmedida)
            });
    
            if (!response.ok) {
                throw new Error('Error al modificar unidadmedida');
            }
    
            const data = await response.json();
            console.log('modificada la unidadmedida:', data);
    
            return data;
    
        } catch (error) {
            
            console.log('Error al modificar unidadmedida');
            throw error;
        }
    },


    deleteUnidaMedida: async (id: number): Promise<void> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/UnidadMedida/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log('Respuesta del servidor:', response);


            if (response.status === 204) {
                console.log('unidadmedida eliminado correctamente');
                //return;
            } else {
                const data = await response.json();
                console.log('unidadmedida eliminado:', data);
            }


            if (!response.ok) {
                throw new Error('Error al eliminar unidadmedida');
            }
        
        


        } catch (error) {
            console.log('Error al eliminar unidadmedida', error);
            throw error;
        }
    },

   

};