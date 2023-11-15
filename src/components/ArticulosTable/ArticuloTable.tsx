import { useEffect, useState } from "react";
import Articulo from "../../types/Articulo";
import { ModalType } from "../../types/modal-type/ModalType";
import { Button, Table } from "react-bootstrap";
import ServicioArticulo from "../../services/ServicioArticulo";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import Loader from "../loader/Loader";
import ArticuloModal from "../ProductModal/ArticuloModal";

const ArticulosTable = () => {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    useEffect(() => {
        const fetchArticulos = async () => {
            const articulos = await ServicioArticulo.getArticulos();
            setArticulos(articulos);
            setIsLoading(false);
        };
        fetchArticulos();
    }, [refreshData]);
    console.log(JSON.stringify(articulos, null, 2));
    const initializeNewProduct = (): Articulo => {
        return {
            id: 0,
            denominacion: "",
            urlImagen: "",
            precioCompra: 0.0,
            stockActual: 0.0,
            stockMinimo: 0.0,
            fechaAlta: new Date(),
            fechaModificacion: new Date(),
            fechaBaja: new Date(),
        };
    };
    const [articulo, setArticulo] = useState<Articulo>(initializeNewProduct);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");
    const handleClick = (newTitle: string, art: Articulo, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setArticulo(art);
        setShowModal(true);
    };
    return (
        <>
            <Button variant="dark" style={{ float: 'right', margin: "1rem" }} onClick={() => handleClick("Nuevo artículo", initializeNewProduct(), ModalType.CREATE)}>
                Añadir artículo
            </Button>
            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Denominación</th>
                            <th>Imagen</th>
                            <th>Precio de compra</th>
                            <th>Stock actual</th>
                            <th>Stock mínimo</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulos.map(articulo => (
                            <tr key={articulo.id}>
                                <td>{articulo.denominacion}</td>
                                <td><img src={articulo.urlImagen} alt={articulo.denominacion} style={{ width: '50px' }} /></td>
                                <td>$ {articulo.precioCompra}</td>
                                <td>{articulo.stockActual}</td>
                                <td>{articulo.stockMinimo}</td>
                                <td><EditButton onClick={() => handleClick("Editar artículo", articulo, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Eliminar artículo", articulo, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showModal && (
                <ArticuloModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    art={articulo}
                    refreshData={setRefreshData}
                />
            )}
        </>
    )
}
export default ArticulosTable;