import "./Menu.css";
import { useEffect, useState } from "react";

import { Button, Card } from "react-bootstrap";
import Loader from "../loader/Loader";
import RubroProducto from "../../types/RubroProducto";
import { RubroProductoService } from "../../services/RubroProductoService";


const Menu =()=>{

    const [rubroProductos, setRubros] = useState<RubroProducto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
          try {
            const rubroProductos = await RubroProductoService.searchRubrosProdDisponibles();
            console.log('RubroProductos obtenidos con éxito');
            setRubros(rubroProductos);
            setIsLoading(false);
          } catch (error) {
            console.error('Error al traer los rubroProductos', error);
          }
        };
    
        loadProducts();
      }, []);



     
//<p className="text-white">{producto.denominacion}</p>
    

    return (
        <>
          {isLoading ? <Loader/>:(
            <div className="bg-dark">
              <h1 className="text-white text-center pt-3 pb-3">Menu</h1>
              {rubroProductos.map((rubroProducto) => (
                <div key={rubroProducto.id} className="mb-3">
                  <h2 className="text-white m-">{rubroProducto.denominacion}</h2>
                  <div className="d-flex flex-wrap">
                    {rubroProducto.producto?.map((producto) => (
                      <div key={producto.id} className="m-4">
                        <Card className="bg-danger text-white" style={{ width: '18rem' } }>
                          <Card.Img variant="top" src={producto.urlImagen} className="min-heightImg"/>
                          <Card.Body className="min-height">
                            <Card.Title>{producto.denominacion}</Card.Title>
                            <Card.Text>{producto.descripcion}</Card.Text>
                            <Button variant="dark">Agregar al carrito</Button>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
      </>
    )
}
export default Menu;