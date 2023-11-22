import { useEffect, useState } from "react";
import { UnidadMedida } from "../../types/UnidadMedida";
import { UnidadMedidaService } from "../../services/UnidadMedidaService";
import Loader from "../loader/Loader";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../../types/ModalType/ModalType";
import UnidadMedidaModal  from "../UnidadMedidaModal/UnidadMedidaModal";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { EditButton } from "../EditButton/EditButton";

const UnidadMedid = () => {

    //Variable que va a contener los datos recibidos por la API
    const [unidadmedid, setUnidadMedida] = useState<UnidadMedida[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderize el componente o refreshData cambie de estado
    useEffect(() => {

        //Llamamos a la funcion para obtener todos los productos declarado en el service
        const fetchProducts = async () => { 
            const unidadmedid = await UnidadMedidaService.getUnidadMedidas();
            setUnidadMedida(unidadmedid);
            setIsLoading(false);
        };

        fetchProducts();

    }, [refreshData]);

    //Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(unidadmedid, null, 2));


    //Se inicializa un producto vacio cuando vallamos a crear uno nuevo, para evitar "undefined"
    const initializeNewUnidadMedida = (): UnidadMedida => {
        return {
            id: 0,
            denominacion: '',
            abreviatura: ''
        };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
    const [unidadmedida, setUnidadMedid] = useState<UnidadMedida>(initializeNewUnidadMedida);

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, unidad: UnidadMedida, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setUnidadMedid(unidad);
        setShowModal(true);
    };

    return (
        <>
            <Button onClick={() => handleClick("Nueva unidad de Medida", initializeNewUnidadMedida(), ModalType.CREATE)}>
                Nueva Unidad Medida
            </Button>

            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Denominacion</th>
                            <th>Descripcion</th>
                            <th>abreviatura</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {unidadmedid.map(unidadmedida => (
                            <tr key={unidadmedida.id}>
                                <td>{unidadmedida.denominacion}</td>
                                <td>{unidadmedida.abreviatura}</td>
                                
                                <td><EditButton onClick={() => handleClick("Editar Producto", unidadmedida, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Borrar Producto", unidadmedida, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            )}


            {showModal && (
                <UnidadMedidaModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    unidad={unidadmedida}
                    refreshData={setRefreshData}
                />
            )}


        </>
    )

}

export default UnidadMedid;
