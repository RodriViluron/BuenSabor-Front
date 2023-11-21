import Producto from "./Producto";

export interface Rubro {
    id:number;
    denominacion:string;

    producto: Producto[];
}