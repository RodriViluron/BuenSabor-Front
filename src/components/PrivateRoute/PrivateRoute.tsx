import { Navigate } from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

type PrivateRouteProps = {
    element: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    //Utils
    const isLoggedIn = useIsLoggedIn();

    //Render
    if (isLoggedIn){
        return element;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;
/*
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute: React.FC<{
  element: React.ReactNode;
  adminOnly?: boolean; // Propiedad opcional para indicar si solo los administradores pueden acceder
}> = ({ element, adminOnly = false, ...rest }) => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  // Verificar si el usuario tiene el rol de administrador si es necesario
  if (adminOnly && decodedToken.role !== 'ADMIN') {
    return <Navigate to="/unauthorized" />;
  }

  // Renderizar la ruta normalmente
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
*/