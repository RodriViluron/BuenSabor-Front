import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup  from 'yup'

import Cliente from "../../types/Cliente";
import { Button, Modal } from "react-bootstrap";
import ClienteService from "../../services/ClienteService";

type ModalDatosPersonalesProps ={
    show : boolean;
    onHide: ()=> void;
}



const ModalDatosPersonales = ({show,onHide}:ModalDatosPersonalesProps) =>{

    const [cliente, setCliente] = useState<Cliente | undefined>(undefined);
    const [modificando,setModificando]=useState(false);
    


    useEffect(() => {
        const fecthDatoscliente = async () => {
            try {
                const cliente = await ClienteService.buscarCliente();
                setCliente(cliente); 
            } catch(error) {
                console.log('Error al buscar datos del cliente', error);
            }
        };
    
        // Solo se ejecuta cuando el componente se monta
        if (show) {
            fecthDatoscliente();
        }
    }, [show]);

    useEffect(() => {
        if (cliente) {
          formik.setValues({
            id: cliente.id,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            telefono: cliente.telefono,
            email: cliente.email,
            eliminado: cliente.eliminado,
            
          });
        }
      }, [cliente]);

    
    
    const validationSchema = Yup.object().shape({
        id:Yup.number().required("El id es obligatorio"),
        nombre: Yup.string().required("El nombre es obligatorio"),
        apellido: Yup.string().required("El apellido es obligatorio"),
        telefono: Yup.string().required("El número de teléfono es obligatorio").min(9, "El número de teléfono debe tener 9 dígitos"),
        email: Yup.string().email("El correo electrónico no es válido").required("El correo electrónico es obligatorio"),
        eliminado:Yup.boolean(),
        
        
      });

    const formik = useFormik({
        initialValues: {
            id: 0, 
            nombre: "",
            apellido: "",
            telefono: "",
            email: "",
            eliminado: false,
            
          },
        
        validationSchema: validationSchema,

        onSubmit: async (values)=>{
            try{
                
                const cliente =await ClienteService.modificarCliente(values);
                setCliente(cliente);
                setModificando(false);
            }
            catch(error){
                console.log('Error al modificar datos personales',error);
                
            }
        },
        
    })

    return (
        <>
            <Modal show={show} onHide={onHide} centered backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title>Datos personales</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        

                        {/*Campo para NOMBRE */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nombre}
                            disabled={!modificando}
                            />
                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="text-danger">{formik.errors.nombre}</div>
                            ): null}
                        </div>

                        {/*Campo para APELLIDO */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="apellido"
                            name="apellido"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.apellido}
                            disabled={!modificando}
                            />
                            {formik.touched.apellido && formik.errors.apellido ? (
                                <div className="text-danger">{formik.errors.apellido}</div>
                            ): null}
                        </div>


                        {/*Campo para TELEFONO */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="phone" className="form-label">Telefono</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="phone"
                            name="telefono"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.telefono}
                            disabled={!modificando}
                            />
                            {formik.touched.telefono && formik.errors.telefono ? (
                                <div className="text-danger">{formik.errors.telefono}</div>
                            ): null}
                        </div>
                    
                        {/*Campo para MAIL */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Correo electronico</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            disabled={!modificando}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger">{formik.errors.email}</div>
                            ): null}
                            
                        </div>   
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    
                    {modificando ? (
                        <Button variant="success" onClick={() => formik.handleSubmit()}>
                            Guardar 
                        </Button>
                    ):  <Button variant="warning" onClick={()=>{setModificando(true)}}>
                            Editar 
                        </Button>}
                    
                </Modal.Footer>
            </Modal>                             
        </>
    )
}
export default ModalDatosPersonales;