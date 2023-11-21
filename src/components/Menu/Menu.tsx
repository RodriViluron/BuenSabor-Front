
import { useEffect, useState } from "react";
import { Rubro } from "../../types/Rubro";
import { RubroService } from "../../services/RubroService";
import { Button, Card } from "react-bootstrap";
import Loader from "../loader/Loader";


const Menu =()=>{

    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
          try {
            const rubros = await RubroService.buscarRubrosProdDisponibles();
            console.log('Rubros obtenidos con éxito');
            setRubros(rubros);
            setIsLoading(false);
          } catch (error) {
            console.error('Error al traer los rubros', error);
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
              {rubros.map((rubro) => (
                <div key={rubro.id} className="mb-3">
                  <h2 className="text-white m-4">{rubro.denominacion}</h2>
                  <div className="d-flex flex-wrap">
                    {rubro.producto.map((producto) => (
                      <div key={producto.id} className="m-4">
                        <Card className="bg-danger text-white" style={{ width: '18rem' } }>
                          <Card.Img variant="top" src={producto.urlImagen} />
                          <Card.Body>
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