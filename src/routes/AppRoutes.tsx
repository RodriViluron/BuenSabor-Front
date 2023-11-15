import { Route, Routes } from "react-router-dom";
import * as React from 'react';
import Clientes from "../pages/Clientes";
import Productos from "../pages/Productos";
import Empleados from "../pages/Empleados";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

const Admin = React.lazy(() => import('../pages/admin/Admin'));


const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/empleados" element={<PrivateRoute element={<Empleados />}/>} />
        <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      
      
    </>
    //<Route path="/register" element={<Register />} />
    //<Route path="/login" element={<Login />} />
    //<Route path="/articulos" element={<PrivateRoute element={<Articulos />} />} />
  )
}

export default AppRoutes