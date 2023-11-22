import { toast } from "react-toastify";
import ClienteService from "../../services/ClienteService";
import { DomicilioService } from "../../services/DomicilioService";
import { Domicilio } from "../../types/Domicilio";
import { ModalType } from "../../types/ModalType/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";


type DomicilioModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    domi: Domicilio;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}; 

const DomicilioModal =({show,onHide,title,modalType,domi,refreshData}:DomicilioModalProps)=>{
    const handleSaveUpdate = async (domi:Domicilio) => {
        try {
            const isNew = domi.id === 0;
            if (isNew) {
                
                await ClienteService.agregarDomicilioCliente(domi);
            } else {
                await DomicilioService.updateDomicilio(domi.id,domi);
            }
            toast.success(isNew ? "Nuevo domicilio añadido" : "Domicilio actualizado", { position: "top-center", });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Error al crear/modificar domiicilio');
        }
    };
    const handleDelete = async () => {
        try {
            await DomicilioService.deleteDomicilio(domi.id);
            toast.success("Domicilio eliminado correctamente", { position: "top-center", });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Error al eliminar domicilio');
        }
    };
    const validationSchema = () => {
        return Yup.object().shape({
            //id: Yup.number().integer().min(0),
            calle: Yup.string().required('La calle es obligatoria'),
            numeroDomicilio: Yup.number().required('El numero de la calle es obligatorio'),
            localidad: Yup.string().required('Por favor ingrese la localidad'),
            codigoPostal:Yup.number().required('El codigo postal es obligatorio'),
            pisoDpto: Yup.number().nullable(),
            numeroDpto: Yup.number().nullable(),
            //usuario: Yup.string().required('Por favor ingrese el usuario'),
        });
    };
    const formik = useFormik({
        initialValues: domi,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Domicilio) => handleSaveUpdate(obj),
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
                            <p>¿Está seguro que desea eliminar este domicilio?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar domicilio
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
                            <Form onSubmit={formik.handleSubmit}>
                                {/* calle */}
                                <Form.Group controlId="formCalle">
                                    <Form.Label>Calle</Form.Label>
                                    <Form.Control
                                        name="calle"
                                        type="string"
                                        value={formik.values.calle || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.calle && formik.touched.calle)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.calle}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* Numero Domicilio */}
                                <Form.Group controlId="formNumeroDomicilio">
                                    <Form.Label>Numeración</Form.Label>
                                    <Form.Control
                                        name="numeroDomicilio"
                                        type="number"
                                        value={formik.values.numeroDomicilio || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.numeroDomicilio && formik.touched.numeroDomicilio)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.numeroDomicilio}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* localidad */}
                                <Form.Group controlId="formLocalidad">
                                    <Form.Label>Localidad</Form.Label>
                                    <Form.Control
                                        name="localidad"
                                        type="string"
                                        value={formik.values.localidad || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.localidad && formik.touched.localidad)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.localidad}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* codigoPostal */}
                                <Form.Group controlId="formCodigoPostal">
                                    <Form.Label>Codigo postal</Form.Label>
                                    <Form.Control
                                        name="codigoPostal"
                                        type="number"
                                        value={formik.values.codigoPostal || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.codigoPostal && formik.touched.codigoPostal)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.codigoPostal}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* pisoDpto */}
                                <Form.Group controlId="formPisoDpto">
                                    <Form.Label>Piso edificio</Form.Label>
                                    <Form.Control
                                        name="pisoDpto"
                                        type="string"
                                        value={formik.values.pisoDpto || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.pisoDpto && formik.touched.pisoDpto)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.pisoDpto}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* numeroDpto */}
                                <Form.Group controlId="formNumeroDpto">
                                    <Form.Label>Nro departamento</Form.Label>
                                    <Form.Control
                                        name="numeroDpto"
                                        type="number"
                                        value={formik.values.numeroDpto || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.numeroDpto && formik.touched.numeroDpto)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.numeroDpto}
                                    </Form.Control.Feedback>
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
export default DomicilioModal;