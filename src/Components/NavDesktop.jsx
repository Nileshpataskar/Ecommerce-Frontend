import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/NavDesktop.css";
const NavDesktop = ({ onSelectCategory, onSelectBrand }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };
  return (
    <div className="main2">
      <div className="navbar-div">
        <Link to="/" className="nav">
          Home
        </Link>
        <Link to="/all" className="nav">
          <div
            className="nav dropdown"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
            
          >
            <span>Store</span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link
                  to="/store"
                  className="dropdown-item"
                  onClick={() => onSelectBrand("Apple")}
                >
                  Apple
                </Link>
                <Link
                  to="/store"
                  className="dropdown-item"
                  onClick={() => onSelectBrand("Samsung")}
                >
                  Samsung
                </Link>
                <Link
                  to="/store"
                  className="dropdown-item"
                  onClick={() => onSelectBrand("OnePlus")}
                >
                  OnePlus
                </Link>
              </div>
            )}
          </div>
        </Link>
        
        <Link to="/book" className="nav">
          Book
        </Link>
        
        {/* <Link to="/store" className="nav"  onClick={() => onSelectCategory("smartphones")}>
          Smartphone 
        </Link> */}

        <Link to="/laptop" className="nav">
          <div
            className="nav dropdown"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            Laptop
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link
                  to="/store"
                  className="dropdown-item"
                  onClick={() => onSelectBrand("Dell")}
                >
                  Dell
                </Link>
                {/* <Link
                  to="/store"
                  className="dropdown-item"
                  onClick={() => onSelectBrand("Apple")}
                >
                  Dell
                </Link> */}
                <Link
                  to="/store"
                  className="dropdown-item"
                  onClick={() => onSelectBrand("asus")}
                >
                  Asus
                </Link>
              </div>
            )}
          </div>
        </Link>

        <Link to="/accesories" className="nav">
          <div
            className="nav dropdown"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            Accesories
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link
                  to="/store"
                  className="dropdown-item"
                  onClick={() => onSelectBrand("Sennheiser")}
                >
                  Sennheiser
                </Link>
                <Link
                  to="/store"
                  className="dropdown-item"
                  onClick={() => onSelectBrand("Fossil")}
                >
                  Fossil
                </Link>
                <Link
                  to="/store"
                  className="dropdown-item"
                  onClick={() => onSelectBrand("Citizen")}
                >
                  Citizen
                </Link>
              </div>
            )}
          </div>
        </Link>

      </div>
    </div>
  );
};

export default NavDesktop;
