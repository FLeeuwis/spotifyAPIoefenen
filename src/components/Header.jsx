import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1 id="nav-titel">SPODIFEI</h1>
      <Link to="/betterfetch">klik hier om in te loggen</Link>
    </header>
  );
};

export default Header;
