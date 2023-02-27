import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start" style={{position:"fixed",left:"0",bottom:"0",minWidth:"100%"
        }}>
            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                © 2023 Copyright:&nbsp;<Link className="text-dark" to="/">Director's Cut</Link>
            </div>
        </footer>
    )
}

export default Footer;