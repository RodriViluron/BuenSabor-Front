import Producto from "./Producto";

export interface RubroProducto {
    id: number;
    denominacion: string;
    eliminado: boolean;


    rubroPadre?: RubroProducto | null;
    producto?: Producto[];
}

export default RubroProducto;