import React, { useState } from "react";
import "../CSS/Navbar.css";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";

function Navbar({ onSelectCategory, onSelectBrand }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="main">
      <nav>
        <div className="navbar-container">
          <div className="menu-container">
            <Menu className="menuButton" onClick={toggleDropdown} />
          </div>

          {dropdownOpen && (
            <ul className="nav-list-mobile">
              <li>
                <div className="searchandcart">
                  <input placeholder="Search Item" className="searchInNav" />
                  <Link to="/cart">
                    <ShoppingCart
                      className="cartInNav"
                      // Toggle cart visibility
                    />
                  </Link>
                </div>
              </li>

              <li>
                <Link to="/all" className="nav mobile">
                  All
                </Link>
              </li>
              <li>
                <Link to="/store" className="nav mobile"   onClick={() => onSelectCategory("smartphones")}
        >
                  Store
                </Link>
              </li>
              <li>
                <Link to="/laptop" className="nav mobile"  onClick={() => onSelectCategory("laptop")}>
                  Laptop
                </Link>
              </li>
              <li>
                <Link to="/accesories" className="nav mobile"
                 onClick={() => onSelectCategory("watch")}>
                Accesories
                </Link>
              </li>
              
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

// import React from "react";
// import "../CSS/Navbar.css";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (

//     <div className="main">
//     <div className="navbar-div">
//       <Link to='/' className="nav">Home</Link>
//       <Link to='/store' className="nav">Smartphone</Link>
//       <Link to='/iphone' className="nav">Iphone</Link>
//       <Link to='/ipad' className="nav">Ipad</Link>
//       <Link to='/macbook' className="nav">Macbook</Link>

//       <Link to='/accesories' className="nav">Accesories</Link>

//       <Link to='/products' className="nav">Test</Link>

//     </div>
//     </div>
//   );
// }

// export default Navbar;
