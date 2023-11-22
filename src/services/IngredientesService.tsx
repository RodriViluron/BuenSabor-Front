import Producto, { Ingredientes } from "../types/Ingredientes";
import { UnidadMedida } from "../types/UnidadMedida";

const BASE_URL = 'http://localhost:8080';

export const IngredientesService = {

    getIngredientes: async (): Promise<Ingredientes[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/ingredientes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Error al recuperar datos de los ingredientes etapa 1');
            }
    
            const data = await response.json();
            console.log('Datos recuperados:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al recuperar datos ingredientes etapa 2');
            throw error;
        }
    },


    getIngrediente: async (id: number): Promise<Ingredientes[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/ingredientes/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Error al recuperar dato ingrediente individual etapa 1');
            }
    
            const data = await response.json();
            console.log('Dato recuperado:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al recuperar dato dato ingrediente individual etapa 2');
            throw error;
        }
    },


    createIngrediente: async (ingrediente: Ingredientes): Promise<Ingredientes[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/ingredientes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingrediente)
            });
    
            if (!response.ok) {
                throw new Error('Error al crear Ingrediente etapa 1');
            }
    
            const data = await response.json();
            console.log('Ingrediente creado:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al crear Ingrediente etapa 2');
            throw error;
        }
    },


    updateIngrediente: async (id: number, ingrediente: Ingredientes): Promise<Ingredientes[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/ingredientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingrediente)
            });
    
            if (!response.ok) {
                throw new Error('Error al modificar ingrediente etapa 1');
            }
    
            const data = await response.json();
            console.log('Ingrediente modificado:', data);
    
            return data;
    
        } catch (error) {
            
            console.log('Error al modificar ingrediente etapa 1');
            throw error;
        }
    },


    deleteIngrediente: async (id: number): Promise<void> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/ingredientes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log('Respuesta del servidor:', response);


            if (response.status === 204) {
                console.log('Ingrediente eliminado correctamente');
                //return;
            } else {
                const data = await response.json();
                console.log('Ingrediente eliminado:', data);
            }


            if (!response.ok) {
                throw new Error('Error al eliminar ingrediente etapa 1');
            }
        
        


        } catch (error) {
            console.log('Error al eliminar ingrediente etapa 2', error);
            throw error;
        }
    },

    ControlarStock : async (): Promise<Ingredientes[]> =>{

        const response = await fetch(`${BASE_URL}/api/v1/ingredientes/controlStockIngredientes`); 
        const data= await response.json();
        return data;
        

    },

    getUnidadMedida: async (id: number): Promise<UnidadMedida> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/ingredientes/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Error al recuperar dato ingrediente individual etapa 1');
            }
    
            const data = await response.json();
            console.log('Dato recuperado:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al recuperar dato dato ingrediente individual etapa 2');
            throw error;
        }
    }

};
