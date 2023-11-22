import { Producto } from "./Producto";

export interface DetallePedido {
    id: number;
    cantidad: number;
    subtotal: number;

    
    //Relaciones
    producto: Producto;
}