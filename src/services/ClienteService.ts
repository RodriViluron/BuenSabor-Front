import Cliente from "../types/Cliente";


const BASE_URL = "http://localhost:8088";

const ClienteService = {
    getClientes: async (): Promise<Cliente[]> => {
        const response = await fetch(`${BASE_URL}/api/clientes/all`);
        const data = await response.json();
        return data;
    },
    getCliente: async (id: number): Promise<Cliente> => {
        const response = await fetch(`${BASE_URL}/api/clientes/${id}`);
        const data = await response.json();
        return data;
    },
    createCliente: async (cliente: Cliente): Promise<Cliente> => {
        const response = await fetch(`${BASE_URL}/api/clientes`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });
        const data = await response.json();
        return data;
    },
    updateCliente: async (id: number, cliente: Cliente): Promise<Cliente> => {
        const response = await fetch(`${BASE_URL}/api/clientes/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });
        const data = await response.json();
        return data;
    },
    deleteCliente: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/clientes/${id}`, {
            method: "DELETE"
        });
    }
}

export default ClienteService;