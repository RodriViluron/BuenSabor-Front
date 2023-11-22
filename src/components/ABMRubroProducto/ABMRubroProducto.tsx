import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { RubroProducto } from "../../types/RubroProducto";

import ModalRubroProducto from "../ModalRubroProducto/ModalRubroProducto";
import { RubroProductoService } from "../../services/RubroProductoService";
import { ModalType } from "../../types/ModalType/ModalType";
import Loader from "../loader/Loader";


const ABMRubroProducto = () => {

  //Variable que va a contener los datos recibidos por la API
  const [rubroProductos, setRubroProductos] = useState<RubroProducto[]>([]);

  //Variable que muestra el componente Loader hasta que se reciban los datos de la API
  const [isLoading, setIsLoading] = useState(true);

  //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
  const [refreshData, setRefreshData] = useState(false);


  //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
  useEffect(() => {

    //Llamamos a la función para obtener todos los productos declarado en el service
    const fetchRubros = async () => {
      const rubroProductos = await RubroProductoService.getRubroProductos();
      setRubroProductos(rubroProductos);
      setIsLoading(false);
    };

    fetchRubros();
  }, [refreshData]);


  //Test, este log está modificado para que muestre los datos de una manera más legible
  console.log(JSON.stringify(rubroProductos, null, 2));


  //Se inicializa una unidad medida vacia cuando vayamos a crear uno nuevo, para evitar "undefined"
  const initializeNewRubro = (): RubroProducto => {
    return {
      id: 0,
      denominacion: '',
      eliminado: false,
      rubroPadre: {
        id: 0,
        denominacion: '',
        eliminado: false,
      },
      producto: [],
    };
  };


  //Producto seleccionado que se va a pasar como prop al Modal
  const [rubroProducto, setRubroProducto] = useState<RubroProducto>(initializeNewRubro);

  //Manejo de Modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [denominacion, setDenominacion] = useState("");

  //Logica de Modal
  const handleClick = (newNombreRubro: string, rub: RubroProducto, modal: ModalType) => {
    setDenominacion(newNombreRubro);
    setModalType(modal);
    setRubroProducto(rub);
    setShowModal(true);

  };

  return (

    <>
      <div className="m-3">

        {/* Botón para que cuando el usuario haga click llame a la función que declaramos */}
        <Button onClick={() => handleClick("Nuevo rubroProducto",
          initializeNewRubro(), ModalType.CREATE)}>
          Nuevo rubroProducto
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
              {rubroProductos.map((rubroProducto) => (
                <tr key={rubroProducto.id}>
                  <td>{rubroProducto.id}</td>
                  <td>{rubroProducto.denominacion}</td>
                  <td>{rubroProducto.rubroPadre ? rubroProducto.rubroPadre.denominacion : ''}</td>
                  <td> <EditButton onClick={() => handleClick("Editar rubroProducto", rubroProducto, ModalType.UPDATE)} /> </td>
                  <td> <DeleteButton onClick={() => handleClick("Eliminar rubroProducto", rubroProducto, ModalType.DELETE)} /> </td>

                </tr>
              ))}
            </tbody>

          </Table>

        )}

        {showModal && (
          <ModalRubroProducto
            show={showModal}
            onHide={() => setShowModal(false)}
            denominacion={denominacion}
            modalType={modalType}
            rub={rubroProducto}
            refreshData={setRefreshData}
          />

        )}


      </div>

    </>
  )
}


export default ABMRubroProducto;