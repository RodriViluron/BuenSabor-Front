
import { Producto } from "../../types/Producto";
import { Button } from "react-bootstrap";

type PropsProducto = {
    prod: Producto;
    onBack: () => void;
}
const VerProducto: React.FC<PropsProducto> = ({ prod, onBack }) => {
    const ver = async (pro: Producto) => {
        // Aquí podrías hacer lo necesario con el producto

    }

    return (<>
        <div className="conteiner d-flex justify-content-center align-items-center" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <div>
                <h2>{prod.denominacion}</h2>
                <div className="conteiner d-flex justify-content-center align-items-center">
                    <img src={prod.urlImagen} />
                </div>
                <p>{prod.descripcion}</p>
                <p>Precio: {prod.precioVenta}</p>

            </div>
        </div>
        <div className=" d-flex justify-content-center align-items-center" >
            <Button style={{ backgroundColor: '#F9ED32', color: 'black', marginRight: '2rem', border: '#F9ED31' }}>Agregar al carrito</Button>
            <Button onClick={onBack}>Volver</Button>
        </div>


    </>
    );
}

export default VerProducto;