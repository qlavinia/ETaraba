import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <Link className="nav-item" to="/">
        Home
      </Link>
      <Link className="nav-item" to="/products">
        Products
      </Link>
      <Link className="nav-item" to="/shoppingCart">
        Shopping Cart
      </Link>
    </div>
  );
}

export default NavBar;
