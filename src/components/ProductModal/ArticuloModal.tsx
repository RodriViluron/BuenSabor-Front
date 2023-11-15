import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/modal-type/ModalType";
import Articulo from "../../types/Articulo";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { useFormik } from "formik";
import ServicioArticulo from "../../services/ServicioArticulo";


type ArticuloModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    art: Articulo;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArticuloModal = ({ show, onHide, title, modalType, art, refreshData }: ArticuloModalProps) => {
    const handleSaveUpdate = async (ar: Articulo) => {
        try {
            const isNew = ar.id === 0;
            if (isNew) {
                await ServicioArticulo.createArticulo(ar);
            } else {
                await ServicioArticulo.updateArticulo(ar.id, ar);
            }
            toast.success(isNew ? "Nuevo artículo añadido" : "Artículo actualizado", { position: "top-center", });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Se ha producido un error');
        }
    };
    const handleDelete = async () => {
        try {
            await ServicioArticulo.deleteArticulo(art.id);
            toast.success("Articulo eliminado correctamente", { position: "top-center", });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Se ha producido un error');
        }
    };
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            denominacion: Yup.string().required('Se requiere ingresar una denominación'),
            urlImagen: Yup.string().required('Se requiere ingresar la URL de una imagen'),
            precioCompra: Yup.number().min(0).required('Se requiere ingresar un precio'),
            stockActual: Yup.number().min(0).required('Se requiere ingresar el stock actual'),
            stockMinimo: Yup.number().min(0).required('Se requiere ingresar un stock mínimo'),
        });
    };
    const formik = useFormik({
        initialValues: art,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Articulo) => handleSaveUpdate(obj),
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
                            <p>¿Está seguro que desea eliminar este artículo?<br />
                                <strong>{art.denominacion}</strong>?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar artículo
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
                                {/* Denominacion */}
                                <Form.Group controlId="formDenominacion">
                                    <Form.Label>Denominación</Form.Label>
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
                                {/* urlImagen */}
                                <Form.Group controlId="formUrlImagen">
                                    <Form.Label>URL Imagen</Form.Label>
                                    <Form.Control
                                        name="urlImagen"
                                        type="string"
                                        value={formik.values.urlImagen || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.urlImagen && formik.touched.urlImagen)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.urlImagen}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* precioCompra */}
                                <Form.Group controlId="formPrecioCompra">
                                    <Form.Label>Precio de compra</Form.Label>
                                    <Form.Control
                                        name="precioCompra"
                                        type="text"
                                        value={formik.values.precioCompra || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioCompra && formik.touched.precioCompra)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.precioCompra}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* stockActual */}
                                <Form.Group controlId="formStockActual">
                                    <Form.Label>Stock actual</Form.Label>
                                    <Form.Control
                                        name="stockActual"
                                        type="text"
                                        value={formik.values.stockActual || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockActual && formik.touched.stockActual)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockActual}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* stockMinimo */}
                                <Form.Group controlId="formStockMinimo">
                                    <Form.Label>Stock mínimo</Form.Label>
                                    <Form.Control
                                        name="stockMinimo"
                                        type="text"
                                        value={formik.values.stockMinimo || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockMinimo && formik.touched.stockMinimo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockMinimo}
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
export default ArticuloModal