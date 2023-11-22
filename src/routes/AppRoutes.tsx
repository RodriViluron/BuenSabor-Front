import { Route, Routes } from "react-router-dom";
import * as React from 'react';
import ClientesPage from "../pages/ClientesPage";
import ProductosPage from "../pages/ProductosPage";
import EmpleadosPage from "../pages/EmpleadosPage";
import HomePage from "../pages/HomePage";
import IngredientesPage from "../pages/IngredientesPage";
import UnidadMedidaPage from "../pages/UnidadMedidaPage";


//import PrivateRoute from "./PrivateRoute";


const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/empleados" element={<EmpleadosPage />}/>
        <Route path="/ingredientes" element={<IngredientesPage />}/>
        <Route path="/UnidadMedida" element={<UnidadMedidaPage />}/>

      </Routes>
      
      
    </>
  )
}

export default AppRoutes