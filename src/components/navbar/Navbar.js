// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/clientes">Clientes</Link>
        </li>
        <li>
          <Link to="/facturas">Facturas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
