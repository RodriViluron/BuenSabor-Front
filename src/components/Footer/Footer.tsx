import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer className="mt-auto py-3 bg-dark text-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-12 d-flex flex-column">
                        <h3>Our Company</h3>
                        <p className="flex-grow-1">Some information about your company.</p>
                    </div>
                    <div className="col-md-4 col-12 d-flex flex-column">
                        <h3>Pimienta Pasion</h3>
                        <p className="flex-grow-1">Panza llena, corazón contento.</p>
                    </div>
                    <div className="col-md-4 col-12">
                        <h3>Redes Sociales</h3>
                        <div className="flex flex-col sm:flex-row ">
                            <h6 className="mb-4 flex flex-col gap-3 text-sm sm:ml-6 sm:mt-0 sm:flex-row sm:text-base">
                                <a 
                                    href="https://github.com/RodriViluron"
                                    rel="noopener noreferrer"
                                    style={{ marginRight: '1rem' }}
                                    className="ml-1 flex gap-2 mr-4"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                    <span className="ml-4">         Viluron             </span>
                                </a>
                                <a
                                    href="https://github.com/Teneze"
                                    rel="noopener noreferrer"
                                    style={{ marginRight: '1rem' }}
                                    className="mr-4 ml-1 flex gap-2 text-sm text-base"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                    <span className="ml-4">         Tenerini</span>
                                </a>
                                <a
                                    href="https://github.com/EmiAmin13"
                                    rel="noopener noreferrer"
                                    style={{ marginRight: '1rem', paddingRight: '1rem'}}
                                    className="ml-1 flex gap-2 text-sm text-base"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                    <span className="ml-4">         Amin</span>
                                </a>
                            </h6>
                        </div>
                        <div className="flex flex-col sm:flex-row ">
                        <h6 className="mb-4 flex flex-col gap-3 text-sm sm:ml-6 sm:mt-0 sm:flex-row sm:text-base">
                                <a 
                                    href="https://github.com/agusgarcia18"
                                    rel="noopener noreferrer"
                                    style={{ marginRight: '1rem' }}
                                    className="ml-1 flex gap-2 mr-4"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                    <span className="ml-4">         Colombo</span>
                                </a>
                                <a
                                    href="https://github.com/andresnovello"
                                    rel="noopener noreferrer"
                                    style={{ marginRight: '1rem' }}
                                    className="mr-4 ml-1 flex gap-2 text-sm text-base"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                    <span className="ml-4">         Novello</span>
                                </a>
                                <a
                                    href="https://github.com/joaPrato"
                                    rel="noopener noreferrer"
                                    style={{ marginRight: '1rem', paddingRight: '1rem'}}
                                    className="ml-1 flex gap-2 text-sm text-base"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                    <span className="ml-4">         Prato</span>
                                </a>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer