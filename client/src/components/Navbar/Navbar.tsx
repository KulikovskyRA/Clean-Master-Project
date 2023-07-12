import { useState, FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="nav">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/client">
        Client
      </Link>
      <Link className="nav-link" to="/admin">
        Admin
      </Link>
      <Link className="nav-link" to="/cleaner">
        Cleaner
      </Link>
    </div>
  );
};

export default Navbar;
