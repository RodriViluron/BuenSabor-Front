import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType/ModalType";
import { Ingredientes } from "../../types/Ingredientes";

//dependencias para validar formularios
import * as Yup from "yup";
import { useFormik } from "formik";
import { IngredientesService } from "../../services/IngredientesService";

//notificaciones
import { toast } from 'react-toastify';


type IngredientesModalProps = {
    show: boolean;
    onHide: () => void;
    title: string
    modalType: ModalType;
    ingre: Ingredientes;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};


const IngredienteModal = ({ show, onHide, title, ingre , modalType, refreshData }: IngredientesModalProps) => {

    //CREATE - UPDATE
    const handleSaveUpdate = async (ingre: Ingredientes) => {
        try {
            const isNew = ingre.id === 0;
            if (isNew) {
                await IngredientesService.createIngrediente(ingre);

            } else {
                await IngredientesService.updateIngrediente(ingre.id, ingre);
            }
            toast.success(isNew ? "Ingrediente Creado" : "Ingrediente Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error al crear ingrediente etapa 3');
        }
    };

    //DELETE
    const handleDelete = async () => {
        try {
            await IngredientesService.deleteIngrediente(ingre.id);
            toast.success("Ingrediente Borrado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error al borrar el ingrediente etapa 3');
        }
    }



    //Yup
    const validationSchema = () => {
        return Yup.object().shape({
            //id: Yup.number().integer().min(0),
            denominacion: Yup.string().required('El titulo es requerido'),
            precioCompra: Yup.number().min(0).required('El tiempo de cocina es requerido'),
            stockActual: Yup.number().min(0).required('El precio de venta es requerido'),
            stockMinimo: Yup.number().min(0).required('El precio de costo es requerido'),
            urlImagen: Yup.string().required('La URL de la imagen es requerida'),
        });
    };

    //Formik, utiliza el esquema de validación para crear un formulario dinámico y que lo bloquee
    //en caso de haber errores
    const formik = useFormik({
        initialValues: ingre,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Ingredientes) => handleSaveUpdate(obj),
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
                            <p>¿Está seguro que desea eliminar el Ingrediente?<br /> <strong>{ingre.denominacion}</strong>?</p>
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

                               

                                {/*"PrecioCompra"*/}
                                <Form.Group controlId="formprecioCompra">
                                    <Form.Label>PrecioCompra</Form.Label>
                                    <Form.Control
                                        name="precioCompra"
                                        type="number"
                                        value={formik.values.precioCompra || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioCompra && formik.touched.precioCompra)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.precioCompra}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"stockActual"*/}
                                <Form.Group controlId="formstockActual">
                                    <Form.Label>stockActual</Form.Label>
                                    <Form.Control
                                        name="stockActual"
                                        type="number"
                                        value={formik.values.stockActual || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockActual && formik.touched.stockActual)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockActual}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"stockMinimo"*/}
                                <Form.Group controlId="formstockMinimo">
                                    <Form.Label>stockMinimo</Form.Label>
                                    <Form.Control
                                        name="stockMinimo"
                                        type="number"
                                        value={formik.values.stockMinimo || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockMinimo && formik.touched.stockMinimo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockMinimo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"urlImagen"*/}
                                <Form.Group controlId="formUrlImagen">
                                    <Form.Label>UrlImagen</Form.Label>
                                    <Form.Control
                                        name="urlImagen"
                                        type="text"
                                        value={formik.values.urlImagen || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.urlImagen && formik.touched.urlImagen)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.urlImagen}
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

export default IngredienteModal;
