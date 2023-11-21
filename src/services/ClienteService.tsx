import decodeJwtToken from "../hooks/decodeJwtToken";
import Cliente from "../types/Cliente";
import { Domicilio } from "../types/Domicilio";


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
    },

    buscarDomiciliosCliente :  async () : Promise<Domicilio> => {

        try{
            const token= window.localStorage.getItem('token');
            if(!token){
                throw new Error('No se encontro el token');
            }
            const decodeToken =decodeJwtToken(token);
            const username= decodeToken.sub;
            console.log('usuario: ',username)
            const response =await fetch(`${BASE_URL}/api/v1/clientes/buscarDomiciliosCliente/?username=${decodeToken.sub}`,{
                headers: {'Authorization': `Bearer ${token}`},
            });
            const data= await response.json();
            return data;
        }
        catch (error) {
            console.error('Error al recuperar domicilios desde el service');
            throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
          }
        
    },

    buscarCliente :async () : Promise<Cliente> => {

        try{
            const token= window.localStorage.getItem('token');
            if(!token){
                throw new Error('No se encontro el token');
            }
            const decodeToken =decodeJwtToken(token);
            const username= decodeToken.sub;
            const response =await fetch(`${BASE_URL}/api/v1/clientes/buscarClente?username=${username}`,{
                headers: {'Authorization': `Bearer ${token}`},
            });

            if (response.ok) {
                console.log('Cliente buscado con exito');
            }
            const data= await response.json();
            return data;
        }
        catch (error) {
            console.error('Error al recuperar Cliente');
            throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
          }
        
    },


    modificarCliente:async (cliente:Cliente) :Promise<Cliente> =>{

        try{
            const token= window.localStorage.getItem('token');
            if(!token){
                throw new Error('No se encontro el token');
            }

            

            const response = await fetch(`${BASE_URL}/api/v1/clientes/modificarCliente`, {
                method: 'PUT',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(cliente)
            });
    
            if (response.ok) {
                console.log('Cliente modificado con exito');
            }
    
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error al modificar Cliente');
            throw error;
          }
    },

}

export default ClienteService;