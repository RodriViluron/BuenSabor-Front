import { Button, Form, Modal, Table } from "react-bootstrap";

//Dependencias para validar los formularios
import * as Yup from "yup";
import { useFormik } from "formik";

//Notificaciones al usuario
import { toast } from 'react-toastify';

import { RubroProducto } from "../../types/RubroProducto";
import { RubroProductoService } from "../../services/RubroProductoService";
import { ModalType } from "../../types/ModalType/ModalType";
import { useState, useEffect } from "react";

//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type ModalRubroProductoProps = {
  show: boolean;
  onHide: () => void;
  denominacion: string;
  modalType: ModalType;
  rub: RubroProducto;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};


const ModalRubroProducto = ({ show, onHide, denominacion, rub, modalType, refreshData }: ModalRubroProductoProps) => {

  //CREATE-UPDATE función handleSaveUpdate 

  const handleSaveUpdate = async (rub: RubroProducto) => {
    try {
      const isNew = rub.id === 0;
      
      if (isNew) {

        await RubroProductoService.createRubroProducto(rub);
      } else {

        await RubroProductoService.updateRubroProducto(rub.id, rub);
      }

      toast.success(isNew ? "RubroProducto creado" : "RubroProducto actualizado", {
        position: "top-center"
      });
      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error('Ha ocurrido un error');

    }

  };

  //Función handleDelete (DELETE)
  const handleDelete = async () => {
    try {

      await RubroProductoService.deleteRubroProducto(rub.id);
      toast.success("RubroProducto borrado", {
        position: "top-center",
      });
      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error");

    }

  };

  const [rubrosDisponibles, setRubrosDisponibles] = useState<RubroProducto[]>([]);

  useEffect(() => {
    async function fetchRubrosDisponibles() {
      try {
        const rubros = await RubroProductoService.searchRubrosProdDisponibles();
        setRubrosDisponibles(rubros);
      } catch (error) {
        console.error('Error al obtener los rubros disponibles', error);
      }
    }

    fetchRubrosDisponibles();
  }, []);

  //YUP - Esquema de validación
  const validationSchema = () => {
    return Yup.object().shape({
      id: Yup.number().required('Este campo es obligatorio'),
      denominacion: Yup.string().required('Este campo es obligatorio'),
      rubroPadre: Yup.object().nullable(),
    });
  };

  const formik = useFormik({
    initialValues: rub,
    validationSchema: validationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: RubroProducto) => handleSaveUpdate(obj),
  });


  return (
    <>

      {modalType === ModalType.DELETE ? (
        <>

          <Modal show={show} onHide={onHide} centered backdrop="static">

            <Modal.Header closeButton>
              <Modal.Title>{denominacion}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p> ¿Está seguro que desea eliminar el producto
                <br /> <strong> {rub.denominacion} </strong> ?
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancelar
              </Button>

              <Button variant="danger" onClick={handleDelete}>
                Eliminar
              </Button>
            </Modal.Footer>

          </Modal>

        </>

      ) : (

        <>

          <Modal show={show} onHide={onHide} centered backdrop="static" className="tabla">
            <Modal.Header closeButton>
              <Modal.Title>{denominacion}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={formik.handleSubmit}>

                <Form.Group controlId="formDenominacion">
                  <Form.Label>Denominacion</Form.Label>
                  <Form.Control
                    type="text"
                    name="denominacion"
                    value={formik.values.denominacion}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.denominacion && !!formik.errors.denominacion}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.denominacion}</Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group controlId="rubroPadre">
                    <Form.Label>Rubro Padre</Form.Label>
                    <Form.Control
                      as="select"
                      name="rubroPadre" 
                      value={formik.values.rubroPadre?.id} 
                      onChange={(event) => {
                        const selectedRubroPadre = rubrosDisponibles.find(rubro => rubro.id === parseInt(event.target.value, 10));
                        formik.setFieldValue('rubroPadre', selectedRubroPadre); // Actualiza el valor del campo rubroPadre en formik
                        
                      }}
                      isInvalid={formik.touched.rubroPadre && !!formik.errors.rubroPadre}
                    >
                      <option value=''>Seleccionar Rubro Padre</option>
                      {rubrosDisponibles.map((rubro) => (
                        <option key={rubro.id} value={rubro.id}>
                          {rubro.denominacion}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{formik.errors.rubroPadre}</Form.Control.Feedback>
                  </Form.Group>

                <Modal.Footer className="mt-4">
                  <Button variant="dark" onClick={onHide}>
                    Cancelar
                  </Button>
                  <Button variant="warning" type="submit" disabled={!formik.isValid}>
                    Guardar
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  )
}

export default ModalRubroProducto;
