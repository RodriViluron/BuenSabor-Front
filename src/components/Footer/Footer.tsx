import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer className="mt-auto py-3 bg-dark text-white">
            <div className="container">
                <div className="row">                                        
                    <div className="col-md-4 col-12 margin-rightRedes">
                        <h3>Redes Sociales</h3>
                        <div className="d-flex justify-content-between flex-wrap color-gris">
                            <div className="flex-grow-1">
                                <h6 className="flex flex-col gap-3">
                                    <a 
                                        href="https://github.com/RodriViluron"
                                        rel="noopener noreferrer"
                                        style={{ marginRight: '1.9rem' }}                                    
                                        className="flex gap-2 "
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                        <span className=" padding-leftIcon">Viluron</span>
                                    </a>
                                    <a
                                        href="https://github.com/Teneze"
                                        rel="noopener noreferrer"
                                        style={{ marginRight: '1rem' }}
                                        className="flex gap-2 text-sm text-base"
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                        <span className=" padding-leftIcon">Tenerini</span>
                                    </a>
                                    <a
                                        href="https://github.com/EmiAmin13"
                                        rel="noopener noreferrer"
                                        style={{ marginRight: '1rem'}}
                                        className="flex gap-2 text-sm text-base"
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                        <span className=" padding-leftIcon">Amin</span>
                                    </a>
                                </h6>
                            </div>
                            <div className="flex-grow-1">
                            <h6 className="flex flex-col gap-3 flex-row">
                                    <a 
                                        href="https://github.com/agusgarcia18"
                                        rel="noopener noreferrer"
                                        style={{ marginRight: '1rem' }}
                                        className="flex gap-2"
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                        <span className="padding-leftIcon">Colombo</span>
                                    </a>
                                    <a
                                        href="https://github.com/andresnovello"
                                        rel="noopener noreferrer"
                                        style={{ marginRight: '1.1rem' }}
                                        className="flex gap-2"
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                        <span className="padding-leftIcon">Novello</span>
                                    </a>
                                    <a
                                        href="https://github.com/joaPrato"
                                        rel="noopener noreferrer"
                                        style={{ marginRight: '1rem', paddingRight: '1rem'}}                    
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                                        <span className="padding-leftIcon">Prato</span>
                                    </a>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-12 margin-topPasion">
                        <h3>Pimienta Pasion</h3>
                        <p className="flex-grow-1 color-gris">Panza llena, corazón contento.</p>
                        <p className="color-grisGit">                            
                            © 2023 El Buen Sabor  
                        <img 
                            className="margin-left"
                            src="images/chile3.svg" 
                            alt="ChileIcono" 
                            width={18} 
                            height={18}
                            />
                        </p>
                    </div>                    
                </div>
            </div>
        </footer>
    )
}

export default Footer