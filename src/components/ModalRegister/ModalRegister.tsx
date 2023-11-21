import { useFormik } from "formik";
import * as Yup  from 'yup'
import { AuthService } from "../../services/AuthService";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

type ModalRegisterProps ={
    show : boolean;
    onHide: ()=>void;
}

const ModalRegister = ({show,onHide}:ModalRegisterProps) => {

    const [showError,setShowError]=useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("El nombre de usuario es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria").min(8, "La contraseña debe tener al menos 8 caracteres"),
        nombre: Yup.string().required("El nombre es obligatorio"),
        apellido: Yup.string().required("El apellido es obligatorio"),
        telefono: Yup.string().required("El número de teléfono es obligatorio").min(9, "El número de teléfono debe tener 9 dígitos"),
        email: Yup.string().email("El correo electrónico no es válido").required("El correo electrónico es obligatorio"),
      });

    const formik = useFormik({
        initialValues:{
            username: '',
            password: '',
            nombre: '',
            apellido:'',
            telefono:'',
            email: '',
        },
        
        validationSchema: validationSchema,

        onSubmit: async (values)=>{
            try{
                const token = await AuthService.register(values);
                console.log('Registro realizado. Token ',token);
                onHide();
            }
            catch(error){
                console.log('Error al registrarse',error);
                setShowError(true)
            }
        },
        
    })

    return(
        <>
            <Modal show={show} onHide={onHide} centered backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title>Registrarse</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        {showError ? (
                            <div className=" text-white bg-danger rounded p-3 ">Ops!!  ocurrió un error;
                            </div>
                        ):null}
                        {/*Campo para USERNAME */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <div className="text-danger">{formik.errors.username}</div>
                            ): null}
                        </div>

                        {/*Campo para PASSWORD */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="password" className="form-label">Constraseña</label>
                            <input 
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-danger">{formik.errors.password}</div>
                            ): null}
                        </div>

                        {/*Campo para NOMBRE */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="name"
                            name="nombre"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nombre}
                            />
                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="text-danger">{formik.errors.nombre}</div>
                            ): null}
                        </div>

                        {/*Campo para APELLIDO */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="lastname" className="form-label">Apellido</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="apellido"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.apellido}
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

                    <Button variant="warning" onClick={() => formik.handleSubmit()}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>                             
        </>
    )
}
export default ModalRegister;
