import { useFormik } from "formik";
import * as Yup  from 'yup'

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { AuthService } from "../../services/AuthService";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

type ModalLoginProps = {
    show : boolean;
    onHide: ()=> void;

}

const ModalLogin = ({show,onHide}:ModalLoginProps) => {

    const [showError,setShowError]=useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("El nombre de usuario es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
    })


    const formik = useFormik({
        initialValues:{
            username:'',
            password:'',
        },
        validationSchema: validationSchema,
        
        onSubmit: async (values) =>{
            try{
                const token = await AuthService.login(values);
                console.log('Login realizado',token);
                onHide();
                
            }
            catch(error){
                console.log('Error al logearse',error);
                setShowError(true)
            }
        },
    })


    
    return(
        <>
            <Modal show={show} onHide={onHide} centered backdrop="static">
                <ModalHeader closeButton >
                    <Modal.Title>Login</Modal.Title>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                        {showError ? (
                            <div className=" text-white bg-danger rounded p-3 ">Los datos ingresados no son validos, intente nuevamente</div>
                        ):null}
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
                            ):null}
                        </div>

                        <div className="mb-3 mt-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
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
                            ):null}
                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>

                    <Button variant="warning" onClick={() => formik.handleSubmit()}>
                        Logear
                    </Button>
                </ModalFooter>
            </Modal>
            
        </>
    )
}
export default ModalLogin;