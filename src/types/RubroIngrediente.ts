import Ingredientes from "./Ingredientes";


export interface RubroIngrediente
{
    id:number;
    denominacion:string;
    eliminado: boolean;


    rubroPadre?: RubroIngrediente | null;
    ingrediente?: Ingredientes[];
}

export default RubroIngrediente;