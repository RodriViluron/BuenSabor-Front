import RubroProducto from "../types/RubroProducto";

const BASE_URL = 'http://localhost:8080';


export const RubroProductoService = {


    getRubroProductos: async (): Promise<RubroProducto[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroProductos`, {
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

    getRubroProducto: async (id: number): Promise<RubroProducto[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroProductos/${id}`, {
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


    createRubroProducto: async (rubroProducto: RubroProducto): Promise<RubroProducto> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroProductos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rubroProducto)
            });

            if (!response.ok) {
                throw new Error('Error al crear rubroProducto');
            }

            const data = await response.json();
            console.log('RubroProducto creado:', data);

            return data;

        } catch (error) {
            console.error('Error al crear rubroProducto');
            throw error;
        }
    },


    updateRubroProducto: async (id: number, rubroProducto: RubroProducto): Promise<RubroProducto> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroProductos/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rubroProducto)
            });

            if (!response.ok) {
                throw new Error('Error al modificar rubroProducto');
            }

            const data = await response.json();
            console.log('RubroProducto modificado:', data);

            return data;

        } catch (error) {

            console.log('Error al modificar rubroProducto');
            throw error;
        }
    },


    deleteRubroProducto: async (id: number): Promise<void> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BASE_URL}/api/v1/rubroProductos/${id}`, {
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
                if (response.status === 400 && data.error === 'Violación de integridad referencial') {
                    // Manejar el error específico de violación de integridad referencial
                    console.log('Error: No se puede eliminar el rubro teniendo productos asociados a ella.');
                    throw new Error('No se puede eliminar el rubro teniendo productos asociados a ella.');
                } else {
                    // Manejar otros errores
                    throw new Error('Error al eliminar rubroProducto');
                }
            }

        } catch (error) {
            console.log('Error al eliminar rubroProducto', error);
            throw error;
        }
    },

    searchRubrosProdDisponibles: async (): Promise<RubroProducto[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubroProductos/searchRubrosProdDisponibles`);
        const data = await response.json();
        return data;

    }

}