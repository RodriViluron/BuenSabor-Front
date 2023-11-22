import { Route, Routes } from "react-router-dom";
import * as React from 'react';
import ClientesPage from "../pages/ClientesPage";
import ProductosPage from "../pages/ProductosPage";
import EmpleadosPage from "../pages/EmpleadosPage";
import HomePage from "../pages/HomePage";


const PrivateRoute = React.lazy(() => import('./PrivateRoute'));


const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/"  />
        <Route element={<PrivateRoute element={<ProductosPage />} />} path="/productos"  />
        <Route element={<PrivateRoute element={<ClientesPage />} />} path="/clientes"  />
        <Route element={<PrivateRoute element={<EmpleadosPage />} />} path="/empleados" />
      </Routes>
      
      
    </>
  )
}

export default AppRoutes