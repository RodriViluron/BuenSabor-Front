type Articulo = {
    id: number;
    denominacion: string;
    urlImagen: string;
    precioCompra: number;
    stockActual: number;
    stockMinimo: number;
    fechaAlta: Date;
    fechaModificacion: Date;
    fechaBaja: Date;
};
export default Articulo;