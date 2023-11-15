import { useEffect, useState } from "react"
import { Producto } from "../../types/Producto"
import { ProductoService } from "../../services/ProductService";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import VerProducto from "./VerProducto";

import { FormControl, Navbar } from "react-bootstrap";
import Form from "react-bootstrap/Form";

interface PropsProducto {
    prodId: number;
}
function TablaProductos() {

    //inicializo un producto vacio, para evitar el undefined
    const initializeNewProduct = (): Producto => {
        return {
            id: 0,
            denominacion: "",
            descripcion: "",
            tiempoEstimadoCocina: 0,
            precioVenta: 0,
            costo: 0,
            urlImagen: "",
            fechaAlta: new Date(),
            fechaModificacion: new Date(),
            fechaBaja: new Date()

        }
    }


    const [productos, setProductos] = useState<Producto[]>([]);
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
    const [filtro, setFiltro] = useState<string>("");


    //traer los productos
    useEffect(() => {
        const fetchProductos = async () => {
            const productos = await
                ProductoService.getProductos();
            setProductos(productos);

        }
        fetchProductos();

    }, []);

    //filtrar productos
    const handleSearch = async (filtro: string) => {
        const productos = await ProductoService.searchProducto(filtro);
        setProductosFiltrados(productos);
        console.log(productos);
    }

    const [selectedProduct, setSelectedProduct] = useState<number | null>(null); //estado para guardar el id del producto

    //entrar al producto deseado
    const verMas = (productID: number) => {
        setSelectedProduct(productID);
    }
    //volver
    const handleBack = () => {
        setSelectedProduct(null);
    };


    if (selectedProduct !== null) {
        // Busca el producto seleccionado en el array de productos
        const selectedProd = productos.find(prod => prod.id === selectedProduct);

        if (selectedProd) {
            return <VerProducto prod={selectedProd} onBack={handleBack} />;
        }
    }


    return (<>
        <div className="d-flex justify-content-center align-items-center">
            <Form className="d-flex"
                style={{ marginTop: '2rem' }}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(filtro);
                }}
            >
                <FormControl
                    type="text"
                    placeholder="Buscar Producto"
                    className="me-2"
                    aria-label="Search"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <Button type="submit" style={{ backgroundColor: "#000000", borderColor: "#000000" }}>
                    Buscar
                </Button>
            </Form>
        </div>

        <div className="d-flex justify-content-center align-items-center">
            {/* Muestra todos los productos o los filtrados */}
            <div className="row" style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => (
                        <div key={producto.id} className="col-auto" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
                            <Card style={{ width: "17rem", height: "25rem" }}>
                                <Card.Img variant="center" src={producto.urlImagen} style={{ height: '250px', maxWidth: '250px', margin: '0.5rem' }} />
                                <Card.Body>
                                    <div style={{ height: '4rem' }}>
                                        <Card.Title style={{ textAlign: 'center' }}>{producto.denominacion}</Card.Title>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Button variant="primary" onClick={() => verMas(producto.id)}>Ver más</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                    ))
                ) : (
                    <>
                        <h4 style={{ color: 'red' }} >No se han encontrado productos que coincidan con "{filtro}"
                        </h4>
                    </>

                )}
            </div>
        </div>


    </>);
}
export default TablaProductos;
