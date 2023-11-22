import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType/ModalType";
import { UnidadMedida } from "../../types/UnidadMedida";


//dependencias para validar formularios
import * as Yup from "yup";
import { useFormik } from "formik";
import { UnidadMedidaService } from "../../services/UnidadMedidaService";

//notificaciones
import { toast } from 'react-toastify';


type UnidadMedidaModalProps = {
    show: boolean;
    onHide: () => void;
    title: string
    modalType: ModalType;
    unidad: UnidadMedida;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};


const UnidadMedidaModal = ({ show, onHide, title, unidad, modalType, refreshData }: UnidadMedidaModalProps) => {

    //CREATE - UPDATE
    const handleSaveUpdate = async (uni: UnidadMedida) => {
        try {
            const isNew = uni.id === 0;
            if (isNew) {
                await UnidadMedidaService.createUnidadMedida(uni);

            } else {
                await UnidadMedidaService.updateUnidadMedida(uni.id, uni);
            }
            toast.success(isNew ? "Unidad Medida Creada" : "Unidad Medida Actualizada", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    };

    //DELETE
    const handleDelete = async () => {
        try {
            await UnidadMedidaService.deleteUnidaMedida(unidad.id);
            toast.success("UnidadMedida Borrada", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    }



    //Yup
    const validationSchema = () => {
        return Yup.object().shape({
            //id: Yup.number().integer().min(0),
            denominacion: Yup.string().required('El titulo es requerido'),
            abreviatura: Yup.string().required('La abreviatura es requerida'),
        });
    };

    //Formik, utiliza el esquema de validación para crear un formulario dinámico y que lo bloquee
    //en caso de haber errores
    const formik = useFormik({
        initialValues: unidad,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: UnidadMedida) => handleSaveUpdate(obj),
    });


    return (
        <>
            {modalType === ModalType.DELETE ? (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>¿Está seguro que desea eliminar la Unidad Medida?<br /> <strong>{unidad.denominacion}</strong>?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Borrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>

            ) : (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {"Formulario"}
                            <Form onSubmit={formik.handleSubmit}>

                                {/*Debajo de la etiqueta Form, vamos a armar un <Form.Group> por cada uno de los campos para dar de alta o modificar un producto. */}

                                {/*"Denominacion"*/}
                                <Form.Group controlId="formDenominacion">
                                    <Form.Label>Denominacion</Form.Label>
                                    <Form.Control
                                        name="denominacion"
                                        type="text"
                                        value={formik.values.denominacion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.denominacion}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"abreviatura"*/}
                                <Form.Group controlId="formabreviatura">
                                    <Form.Label>abreviatura</Form.Label>
                                    <Form.Control
                                        name="abreviatura"
                                        type="text"
                                        value={formik.values.abreviatura || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.abreviatura && formik.touched.abreviatura)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.abreviatura}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                

                                <Modal.Footer className="mt-4">
                                    <Button variant="secondary" onClick={onHide}>
                                        Cancelar
                                    </Button>

                                    <Button variant="primary" type="submit" disabled={!formik.isValid}>
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

export default UnidadMedidaModal;
