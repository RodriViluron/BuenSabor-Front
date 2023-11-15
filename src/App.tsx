import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Container } from "react-bootstrap";
import Loader from "./components/Loader/Loader";
import { Suspense } from "react";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    
    <>
      <Router>
            <AppRoutes />
      </Router>
    </>

  )
}

export default App




