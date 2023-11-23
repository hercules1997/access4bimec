import React, { useState } from "react";
import "./style.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        Toggle Menu
      </button>
      <nav className="menu-content">
        <ul>
          <li>Opção 1</li>
          <li>Opção 2</li>
          <li>Opção 3</li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
