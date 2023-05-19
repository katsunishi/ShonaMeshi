import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="headerTitle">
        <div className="headerLogo"></div>
        <div className="Title">
          <Link to="/">onaMeshi</Link>
        </div>
      </div>
      <div className="headerMenu">
        <Link to="/contact">Contact</Link>
      </div>
    </header>
  );
}

export default Header;
