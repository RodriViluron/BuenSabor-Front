import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';
import {useNavigate}from 'react-router-dom'
import {useState} from 'react'

import ModalRegister from "../ModalRegister/ModalRegister";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalDatosPersonales from "../ModalDatosPersonales/ModalDatosPersonales";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";



const Header = ()=>{

  const navigate = useNavigate();  
  const [showRegisterModal,setShowRegisterModal]= useState(false);
  const [showLoginModal,setShowLoginModal]= useState(false);
  const [showDatosPersonalesModal,setShowDatosPersonalesModal]= useState(false);
  
  const handleShowRegisterModdal =()=>{
    setShowRegisterModal(true);
  }

  const handleShowLoginModdal =()=>{
    setShowLoginModal(true);
  }

  const handleShowDatosPersonalesModal =()=>{
    setShowDatosPersonalesModal(true);
  }

  function onLogOut() {
    window.localStorage.removeItem('token');
    navigate('/');
  }



    return(
        <>
          <Navbar expand="lg" className="bg-danger">
            <Container>
              <div className="d-flex justify-content-between align-items-center w-100">
                {/* Sección izquierda del header */}
                <Nav.Link className="d-flex align-items-center">
                  <a onClick={() => { navigate('/') }}>
                    <div className="logo-container">
                      <img
                        src="images/chile.svg"
                        alt="logo"
                        className="logo-img"
                      />
                    </div>
                  </a>
                  <Navbar.Brand onClick={() => { navigate('/') }}>El Buen Sabor</Navbar.Brand>
                </Nav.Link>

                {/* Sección central del header (barra de búsqueda) */}
                <div className="d-flex align-items-center">
                  <div className="input-group">
                    <input type="text" placeholder="Buscar..." className="form-control" />
                    <button className="btn btn-outline-light" type="button">
                      <i className="bi bi-search"></i> 
                    </button>
                  </div>
                </div>

                {/* Sección derecha del header */}
                <div>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto ">
                      <NavDropdown title="Administración" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => { navigate('/empleados') }}>Empleados</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { navigate('/productos') }}>Productos</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { navigate('/clientes') }}>Clientes</NavDropdown.Item>
                      </NavDropdown>
                      {!useIsLoggedIn() ? (
                        <div className="d-flex">
                          <div className="d-md-none d-lg-block" style={{ marginLeft: '12px' }}></div>
                          <Nav.Link ><Button variant="warning" onClick={handleShowLoginModdal}>Login</Button></Nav.Link>
                          <div className="d-md-none d-lg-block" style={{ marginLeft: '12px' }}></div>
                          <Nav.Link ><Button variant="warning" onClick={handleShowRegisterModdal}>Register</Button></Nav.Link>
                        </div>
                      ):null}
                      {useIsLoggedIn()?(
                      <div >
                        <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleShowDatosPersonalesModal} ><i className="bi bi-person "></i>  Datos Personales</NavDropdown.Item>
                        <NavDropdown.Item  ><i className="bi bi-gear "></i>  Configuracion</NavDropdown.Item>
                        <NavDropdown.Item  onClick={()=>{onLogOut()}}><i className="bi bi-box-arrow-right"></i>  Cerrar Sesión</NavDropdown.Item>
                      </NavDropdown>
                      </div>
                        
                      ):null}
                    </Nav>
                  </Navbar.Collapse>
                </div>
              </div>
            </Container>
          </Navbar>
          {/* Logica para mostrar el modal del registro*/ }
          {showRegisterModal && <ModalRegister
          show={showRegisterModal}
          onHide={()=>setShowRegisterModal(false)}
          />}

          {/* Logica para mostrar el modal del login*/ }
          {showLoginModal && <ModalLogin
          show={showLoginModal}
          onHide={()=> setShowLoginModal(false)}
          />}

          {showDatosPersonalesModal && <ModalDatosPersonales
          show={showDatosPersonalesModal}
          onHide={()=> setShowDatosPersonalesModal(false)}
          />}
       

          
        </>
    )
}
export default Header;

    