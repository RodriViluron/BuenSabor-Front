import RubroIngrediente from "../types/RubroIngrediente";


const BASE_URL= 'http://localhost:8080';


export const RubroIngredienteService ={


    getRubroIngredientes: async (): Promise<RubroIngrediente[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroIngredientes`, {
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

    getRubroIngrediente: async (id: number): Promise<RubroIngrediente[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroIngredientes/${id}`, {
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


    createRubroIngrediente: async (rubroProducto: RubroIngrediente): Promise<RubroIngrediente> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroIngredientes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rubroProducto)
            });

            if (!response.ok) {
                throw new Error('Error al crear rubroIngrediente');
            }

            const data = await response.json();
            console.log('RubroProducto creado:', data);

            return data;

        } catch (error) {
            console.error('Error al crear rubroIngrediente');
            throw error;
        }
    },


    updateRubroIngrediente: async (id: number, rubroProducto: RubroIngrediente): Promise<RubroIngrediente> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroIngredientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rubroProducto)
            });

            if (!response.ok) {
                throw new Error('Error al modificar rubroIngrediente');
            }

            const data = await response.json();
            console.log('RubroProducto modificado:', data);

            return data;

        } catch (error) {

            console.log('Error al modificar rubroIngrediente');
            throw error;
        }
    },


    deleteRubroIngrediente: async (id: number): Promise<void> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroIngredientes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Respuesta del servidor:', response);


            if (response.status === 204) {
                console.log('RubroProducto eliminado correctamente');
                //return;
            } else {
                const data = await response.json();
                console.log('RubroProducto eliminado:', data);
            }


            if (!response.ok) {
                throw new Error('Error al eliminar rubroIngrediente');
            }




        } catch (error) {
            console.log('Error al eliminar rubroIngrediente', error);
            throw error;
        }
    },

    searchRubrosIngDisponibles: async (): Promise<RubroIngrediente[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubroIngredientes/searchRubrosIngDisponibles`);
        const data = await response.json();
        return data;

    }
}