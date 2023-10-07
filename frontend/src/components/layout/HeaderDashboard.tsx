import React, { useState } from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../assets/css/Main.css';

import Logo from '../../assets/img/DraftLogoWithoutBackground.png';

export default function HeaderDashboard() {
    const [isDropdown2Open, setDropdown2Open] = useState(false);

    return (
        <header className="py-3 mb-3 border-bottom">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-4 -mt-2">
                        <img src={Logo} alt="logo" width="142" height="70" role="img" aria-label="Logo" />
                    </div>

                    <div className="col-lg-8 d-flex align-items-center">
                        <form className="w-100 me-3" role="search">
                            <input type="search" className="form-control" placeholder="Pesquisar..." aria-label="Search" />
                        </form>

                        <Dropdown show={isDropdown2Open} onToggle={(isOpen) => setDropdown2Open(isOpen)}>
                            <Dropdown.Toggle
                                as="a"
                                href="#"
                                className="d-block link-dark text-decoration-none"
                            >
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </Dropdown.Toggle>
                            <Nav className=''>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link to="/dashboard" className="nav-link">
                                            Inicio
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link to="/configuracoes" className="nav-link">
                                            Configurações
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link to="/perfil" className="nav-link">
                                            Perfil
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        <Link to="/" className="nav-link">
                                            Sair
                                        </Link>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Nav>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
}
