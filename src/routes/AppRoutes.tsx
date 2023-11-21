import { Route, Routes } from "react-router-dom";
import * as React from 'react';
import ClientesPage from "../pages/ClientesPage";
import ProductosPage from "../pages/ProductosPage";
import EmpleadosPage from "../pages/EmpleadosPage";
import HomePage from "../pages/HomePage";


//import PrivateRoute from "./PrivateRoute";


const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/empleados" element={<EmpleadosPage />}/>

      </Routes>
      
      
    </>
  )
}

export default AppRoutes