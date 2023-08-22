import React, { useState } from "react";
import "../CSS/Logo.css";
import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify"; // Import the toast module
import { useSelector } from "react-redux";
import  axios  from 'axios';

function Logo() {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false); // Add this state

  const cartItems = useSelector((state) => state.cart.cartItems);
  const distinctItemCount = cartItems.length;

  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  const toggleCart = () => {
    if (!isAuthenticated) {
      // Show toast and prevent opening cart if not logged in
      toast.warning("Please log in to access the cart");
      return;
    }

    setCartVisible(!cartVisible);
  };
  // const handleRegistration = async () => {
  //   console.log("in storing database")
  //   if (!isAuthenticated) {
  //     toast.warning('Please log in to register');
  //     return;
  //   }

  //   const registrationData = {
  //     Email: user.email,
  //     Name: user.name,
  //   };

  //   try {
  //     const response = await axios.post('/register', registrationData);
  //     console.log("hum jeet gaye")
  //     console.log(response.data.message); // Show success message
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  const handleRegistration = async () => {
  
    if (!isAuthenticated) {
      toast.warning('Please log in to register');
      return;
    }
  
    const registrationData = {
      Email: user.email,
      Name: user.name,
    };
    console.log(registrationData)
  
    try {
      console.log("Sending registration request...");
      const response = await axios.post('/register', registrationData);
      console.log("Registration response:", response.data.message); 
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const onLoginSuccess = () => {
    handleRegistration(); // Call your registration function here
  };
  return (
    <div className="logo-div">
      <Link to="/" className="ishop">
        iSHOP
      </Link>
      <div className="right">
        <div className="searchDiv">
          <input placeholder="Search Item" className="search" />
          <Search className="iconBlack " />
        </div>

        <Link to="/cart">
          <ShoppingCart
            className="iconLogo"
            onClick={() => toggleCart()} // Toggle cart visibility
          />
          <div className="cart-count">{distinctItemCount}</div>{" "}
          {/* Display distinct item count */}
        </Link>
        <Link to="/profile" className="link2">
          {isAuthenticated && (
            <img className="profileImg" src={user.picture} alt={"img"} />
          )}
        </Link>
        <div
          className="user2"
          onMouseEnter={toggleUserMenu}
          onMouseLeave={toggleUserMenu}
        >
          <Link to="/profile" className="link2">
            {isAuthenticated && <p className="iconLogoName">{user.name}</p>}
          </Link>
          {userMenuVisible && (
            <div className="user-menu">
              <ul>
                {/* <li>
                  <Link to="/profile" className="link2">
                    Profile
                  </Link>{" "}
                </li> */}
              </ul>
            </div>
          )}
        </div>

        {isAuthenticated ? (
          <button
            className="btn"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        ) : (
          <button className="btn" onClick={() => {
           
            loginWithRedirect() 
            handleRegistration()
       
       } } >
            Log In
          </button>
        )}
      </div>
      {isAuthenticated && onLoginSuccess()}
      {/* {cartVisible && <Cart />} */}
    </div>
  );
}

export default Logo;
