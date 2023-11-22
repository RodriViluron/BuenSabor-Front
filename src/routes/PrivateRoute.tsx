import * as React from "react";
import { Navigate } from "react-router-dom";

import useIsLoggedIn from "../hooks/useIsLoggedIn";
import ModalLogin from "../components/ModalLogin/ModalLogin";

type PrivateRouteProps = {
    element: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    //Utils
    const isLoggedIn: boolean = useIsLoggedIn();
    const [showLoginModal, setShowLoginModal] = React.useState(false);
    const [redirected, setRedirected] = React.useState(false);

    React.useEffect(() => {    
        if (!isLoggedIn && !redirected) {
            setRedirected(true);
            setShowLoginModal(true);
        }
    }, [isLoggedIn, redirected]);

    //Render
    if (isLoggedIn) {
        return element;
    }

    return (
        <>
            {redirected && <Navigate to="/" />}
            <ModalLogin show={showLoginModal} onHide={() => setShowLoginModal(false)} />
        </>
    );
};

export default PrivateRoute;