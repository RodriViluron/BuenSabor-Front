import { useEffect,useState } from "react";
import { Domicilio } from "../../types/Domicilio";
import ClienteService from "../../services/ClienteService";
import { ModalType } from "../../types/ModalType/ModalType";
import Loader from "../loader/Loader";
import { Table ,Button} from "react-bootstrap";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import DomicilioModal from "../DomicilioModal/DomicilioModal";



const DomicilioTable =()=>{

    const [domicilios, setDomicilios] = useState<Domicilio[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(()=>{
        const fetchDomicilios = async ()=>{
            try{
                const domicilios = await ClienteService.buscarDomiciliosCliente();
                setDomicilios(domicilios);
                setIsLoading(false);
            }
        catch(error){
            console.log('Error al cargar domicilios del cliente',error)
        }
        }

        fetchDomicilios();
        
    },[refreshData])

    const initializeNewDomicilio = (): Domicilio => {
        return {
            id:0,
            calle: '',
            numeroDomicilio:0,
            localidad:'',
            codigoPostal:0,
            pisoDpto:0,
            numeroDpto:0,
        };
    };

    const [domicilio, setDomicilio] = useState<Domicilio>(initializeNewDomicilio);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    const handleClick = (newTitle: string, domi:Domicilio, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setDomicilio(domi);
        setShowModal(true);
    };
    
    return (
        <>
            <h2 className="text-center mb-3 mt-3">Domicilios de entrega</h2>
            <Button variant="dark" style={{ float: 'right', margin: "1rem" }} onClick={() => handleClick("Nuevo Domicilio", initializeNewDomicilio(), ModalType.CREATE)}>
                Añadir Domicilio
            </Button>
            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Calle</th>
                            <th>Numero</th>
                            <th>Localidad</th>
                            <th>Codigo Postal</th>
                            <th>Nro de piso</th>
                            <th>Nro de departamento</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {domicilios.map(domicilio => (
                            <tr key={domicilio.id}>
                                <td>{domicilio.calle}</td>
                                <td>{domicilio.numeroDomicilio}</td>
                                <td>{domicilio.localidad}</td>
                                <td>{domicilio.codigoPostal}</td>
                                <td>{domicilio.pisoDpto}</td>
                                <td>{domicilio.numeroDpto}</td>
                                <td><EditButton onClick={() => handleClick("Editar domicilio", domicilio, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Eliminar domicilio", domicilio, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showModal && (
                <DomicilioModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    domi={domicilio}
                    refreshData={setRefreshData}
                />
            )}
        </>
    )






}
export default DomicilioTable;