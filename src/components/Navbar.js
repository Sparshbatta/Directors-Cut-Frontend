import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({setShowModal, setMode}) => {
    return (
        <nav className="navbar-nav navbar-expand-lg fixed-top navbar-color">
                <ul className="navbar-nav navbar-expand-lg editor-panel" width="100%">
                    <li>
                        <Link className="nav-link editor-panel" to="/">
                            <img src="/logo.png" height="40px" alt="logo"/>
                            <img src="/directorCut.png" height="30px" alt="directorCut"/>
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" ><button className="btn btn-primary" onClick={()=>{setShowModal(true);setMode('Add')}}>Add Director</button></Link>
                    </li>
                </ul>
        </nav>
    )
}

export default Navbar;