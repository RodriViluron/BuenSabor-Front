import { useEffect, useState } from "react";
import { Ingredientes } from "../../types/Ingredientes";
import { IngredientesService } from "../../services/IngredientesService";
import Loader from "../loader/Loader";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../../types/ModalType/ModalType";
import IngredientModal from "../IngredientesModal/IngredientesModal";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { EditButton } from "../EditButton/EditButton";


const IngredientesTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [ingredientes, setIngredientes] = useState<Ingredientes[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderize el componente o refreshData cambie de estado
    useEffect(() => {

        //Llamamos a la funcion para obtener todos los productos declarado en el service
        const fetchIngredientes = async () => { 
            const ingredientes = await IngredientesService.getIngredientes();
            setIngredientes(ingredientes);
            setIsLoading(false);
        };

        fetchIngredientes();

    }, [refreshData]);

    //Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(ingredientes, null, 2));


    //Se inicializa un producto vacio cuando vallamos a crear uno nuevo, para evitar "undefined"
    const initializeNewIngrediente = (): Ingredientes => {
        return {
            id: 0,
            denominacion: '',
            precioCompra: 0,
            stockActual: 0,
            urlImagen: '',
            stockMinimo: 0,
            
        };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
    const [ingredient, setIngrediente] = useState<Ingredientes>(initializeNewIngrediente);

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, ingre: Ingredientes, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setIngrediente(ingre);
        setShowModal(true);
    };

    return (
        <>
            <Button onClick={() => handleClick("Nuevo Ingrediente", initializeNewIngrediente(), ModalType.CREATE)}>
                Nuevo Ingrediente
            </Button>

            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Denominacion</th>
                            <th>precioCompra</th>
                            <th>stockActual</th>
                            <th>stockMinimo</th>
                            <th>urlImagen</th>

                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredientes.map(ingredientes => (
                            <tr key={ingredientes.id}>
                                <td>{ingredientes.denominacion}</td>
                                <td>{ingredientes.precioCompra}</td>
                                <td>{ingredientes.stockActual}</td>
                                <td>{ingredientes.stockMinimo}</td>
                                <td><img src={ingredientes.urlImagen} alt={ingredientes.denominacion} style={{ width: '50px' }} /></td>
                                <td><EditButton onClick={() => handleClick("Editar Ingrediente", ingredientes, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Borrar Ingrediente", ingredientes, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            )}


            {showModal && (
                <IngredientModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    ingre={ingredient}
                    refreshData={setRefreshData}
                />
            )}


        </>
    )

}

export default IngredientesTable;
