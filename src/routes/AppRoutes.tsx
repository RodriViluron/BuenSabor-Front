import { Route, Routes } from "react-router-dom";
import * as React from 'react';
import ClientesPage from "../pages/ClientesPage";
import ProductosPage from "../pages/ProductosPage";
import EmpleadosPage from "../pages/EmpleadosPage";
import HomePage from "../pages/HomePage";
import IngredientesPage from "../pages/IngredientesPage";
import UnidadMedidaPage from "../pages/UnidadMedidaPage";
import DomiciliosPage from "../pages/DomiciliosPage";
import ABMRubroProductoPage from "../pages/ABMRubroProductoPage/ABMRubroProductoPage";
import ABMRubroIngredientePage from "../pages/ABMRubroIngredientePage/ABMRubroIngredientePage";


const PrivateRoute = React.lazy(() => import('./PrivateRoute'));


const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/"  />
        <Route element={<PrivateRoute element={<ProductosPage />} />} path="/productos"  />
        <Route element={<PrivateRoute element={<ClientesPage />} />} path="/clientes"  />
        <Route element={<PrivateRoute element={<EmpleadosPage />} />} path="/empleados" />
        <Route element={<PrivateRoute element={<IngredientesPage />} />} path="/ingredientes" />
        <Route element={<PrivateRoute element={<UnidadMedidaPage />} />} path="/UnidadMedida" />
        <Route element={<PrivateRoute element={<DomiciliosPage />} />} path="/domicilios" />
        <Route element={<PrivateRoute element={<ABMRubroProductoPage />} />} path="/rubroProductos" />
        <Route element={<PrivateRoute element={<ABMRubroIngredientePage/>} />} path="/rubroIngredientes"/>
      </Routes>
      
      
    </>
  )
}

export default AppRoutes