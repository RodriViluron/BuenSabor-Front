import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Articulos from "../pages/Articulos";
import Clientes from "../pages/Clientes";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/articulos" element={<PrivateRoute element={<Articulos />}/>} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
export default AppRoutes;