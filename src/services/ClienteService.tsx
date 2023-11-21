import Cliente from "../types/Cliente";


const BASE_URL = "http://localhost:8080";

const ClienteService = {


    getClientes: async (): Promise<Cliente[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/clientes`, {
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

    getCliente: async (id: number): Promise<Cliente[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/clientes/${id}`, {
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

    createCliente: async (cliente: Cliente): Promise<Cliente[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/clientes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente)
            });
    
            if (!response.ok) {
                throw new Error('Error al crear cliente');
            }
    
            const data = await response.json();
            console.log('Cliente creado:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al crear cliente');
            throw error;
        }
    },

    /*
    updateCliente: async (id: number, cliente: Cliente): Promise<Cliente> => {
        const response = await fetch(`${BASE_URL}/api/v1/clientes/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });
        const data = await response.json();
        return data;
    },
    */

    updateCliente: async (id: number, cliente: Cliente): Promise<Cliente[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/clientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(cliente)
            });
    
            if (!response.ok) {
                throw new Error('Error al modificar cliente');
            }
    
            const data = await response.json();
            console.log('Cliente modificado:', data);
    
            return data;
    
        } catch (error) {
            
            console.log('Error al modificar cliente');
            throw error;
        }
    },

    /*
    deleteCliente: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/clientes/${id}`, {
            method: "DELETE"
        });
    }
    */

    deleteCliente: async (id: number): Promise<void> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/clientes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log('Respuesta del servidor:', response);


            if (response.status === 204) {
                console.log('Cliente eliminado correctamente');
                //return;
            } else {
                const data = await response.json();
                console.log('Cliente eliminado:', data);
            }


            if (!response.ok) {
                throw new Error('Error al eliminar cliente');
            }
        
        


        } catch (error) {
            console.log('Error al eliminar cliente', error);
            throw error;
        }
    }

}

export default ClienteService;