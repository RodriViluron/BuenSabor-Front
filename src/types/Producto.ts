export interface Producto {
    id: number;
    denominacion: string;
    descripcion: string;
    tiempoEstimadoCocina: number;
    precioVenta: number;
    costo: number;
    urlImagen: string;
    fechaAlta: Date;
    fechaModificacion: Date;
    fechaBaja: Date;
}