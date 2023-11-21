import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../../services/ProductoService";
import { Producto } from "../../types/Producto";

const DetalleProducto: React.FC = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        if (idProducto && !isNaN(parseInt(idProducto, 10))) {
          const productoData = await ProductService.getProducto(parseInt(idProducto, 10));
          setProducto(productoData);
          
        } else {
          console.error('Identificador de producto no válido');
        }
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };

    fetchProducto();
  }, [idProducto]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6">
          <img src={producto?.urlImagen} alt={producto?.denominacion} className="card-img-top mb-5" />
        </div>

        <div className="col-12 col-md-6">
          <h1 className="display-5 fw-bolder">Titulo: {producto?.denominacion}</h1>
          {/*<h5>Categoría: {producto?.categoriaArticuloManufacturado.nombreCategoriaArticuloManufacturado}</h5>*/}
          <p className="lead">Descripción: {producto?.descripcion}</p>
          <p className="lead">Precio: ${producto?.precioVenta}</p>
          {/* Add more details or components as needed */}
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
