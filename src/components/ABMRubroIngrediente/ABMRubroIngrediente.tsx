import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { RubroIngrediente } from "../../types/RubroIngrediente";

import { RubroIngredienteService } from "../../services/RubroIngredienteService";
import { ModalType } from "../../types/ModalType/ModalType";
import Loader from "../loader/Loader";
import ModalRubroIngrediente from "../ModalRubroIngrediente/ModalRubroIngrediente";


const ABMRubroIngrediente = () => {

  //Variable que va a contener los datos recibidos por la API
  const [rubroIngredientes, setRubroIngredientes] = useState<RubroIngrediente[]>([]);

  //Variable que muestra el componente Loader hasta que se reciban los datos de la API
  const [isLoading, setIsLoading] = useState(true);

  //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
  const [refreshData, setRefreshData] = useState(false);


  //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
  useEffect(() => {

    //Llamamos a la función para obtener todos los productos declarado en el service
    const fetchRubros = async () => {
      const rubroIngredientes = await RubroIngredienteService.getRubroIngredientes();
      setRubroIngredientes(rubroIngredientes);
      setIsLoading(false);
    };

    fetchRubros();
  }, [refreshData]);


  //Test, este log está modificado para que muestre los datos de una manera más legible
  console.log(JSON.stringify(rubroIngredientes, null, 2));


  //Se inicializa una unidad medida vacia cuando vayamos a crear uno nuevo, para evitar "undefined"
  const initializeNewRubro = (): RubroIngrediente => {
    return {
      id: 0,
      denominacion: '',
      eliminado: false,
      rubroPadre: {
        id: 0,
        denominacion: '',
        eliminado: false,
      },
      ingrediente: [],
    };
  };


  //RubroIngrediente seleccionado que se va a pasar como prop al Modal
  const [rubroIngrediente, setRubroIngrediente] = useState<RubroIngrediente>(initializeNewRubro);

  //Manejo de Modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [denominacion, setDenominacion] = useState("");

  //Logica de Modal
  const handleClick = (newNombreRubro: string, rub: RubroIngrediente, modal: ModalType) => {
    setDenominacion(newNombreRubro);
    setModalType(modal);
    setRubroIngrediente(rub);
    setShowModal(true);

  };

  return (

    <>
      <div className="m-3">

        {/* Botón para que cuando el usuario haga click llame a la función que declaramos */}
        <Button onClick={() => handleClick("Nuevo rubroIngrediente",
          initializeNewRubro(), ModalType.CREATE)}>
          Nuevo rubroIngrediente
        </Button>

        {isLoading ? <Loader /> : (

          <Table>
            <thead>
              <tr>
                <th> ID </th>
                <th> Rubro </th>
                <th> Rubro Padre</th>
                <th> Editar </th>
                <th> Eliminar </th>
              </tr>
            </thead>

            <tbody>
              {rubroIngredientes.map((rubroIngrediente) => (
                <tr key={rubroIngrediente.id}>
                  <td>{rubroIngrediente.id}</td>
                  <td>{rubroIngrediente.denominacion}</td>
                  <td>{rubroIngrediente.rubroPadre ? rubroIngrediente.rubroPadre.denominacion : ''}</td>
                  <td> <EditButton onClick={() => handleClick("Editar rubroIngrediente", rubroIngrediente, ModalType.UPDATE)} /> </td>
                  <td> <DeleteButton onClick={() => handleClick("Eliminar rubroIngrediente", rubroIngrediente, ModalType.DELETE)} /> </td>

                </tr>
              ))}
            </tbody>

          </Table>

        )}

        {showModal && (
          <ModalRubroIngrediente
            show={showModal}
            onHide={() => setShowModal(false)}
            denominacion={denominacion}
            modalType={modalType}
            rub={rubroIngrediente}
            refreshData={setRefreshData}
          />

        )}


      </div>

    </>
  )
}


export default ABMRubroIngrediente;