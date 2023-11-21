import { Rubro } from "../types/Rubro";

const BASE_URL= 'http://localhost:8080';


export const RubroService ={

    buscarRubrosProdDisponibles : async (): Promise<Rubro[]> =>{
        const response = await fetch(`${BASE_URL}/api/v1/rubroProductos/buscarRubrosProdDisponibles`); 
        const data= await response.json();
        return data;

    }

}