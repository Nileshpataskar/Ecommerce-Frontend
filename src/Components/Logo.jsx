import React, { useEffect, useState } from "react";
import "../CSS/Logo.css";
import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify"; // Import the toast module
import axios from "axios";

function Logo() {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [distinctItemCount, setDistinctItemCount] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false); // Add this state
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  const toggleCart = () => {
    if (!isAuthenticated) {
      toast.warning("Please log in to access the cart");
      return;
    }

    setCartVisible(!cartVisible);
  };

  const handleRegistration = async () => {
    const registrationData = {
      Email: user.email,
      Name: user.name,
    };

    try {
      await axios.post(
        "https://ecommerce-backend-b71d.onrender.com/register",
        registrationData
      );
      setIsRegistered(true); // Set registration status to true
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const onLoginSuccess = () => {
    if (!isRegistered) {
      handleRegistration();
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      axios
        .get(`https://ecommerce-backend-b71d.onrender.com/search?keyword=${searchQuery}`)
        .then((response) => {
          setSearchResults(response.data.products);
        })
        .catch((error) => {
          console.error("Error during search:", error);
        });
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`https://ecommerce-backend-b71d.onrender.com/getDistinctItemCount/${user?.sub}`)
        .then((response) => {
          setDistinctItemCount(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching distinct item count:", error);
        });
    }
  }, [isAuthenticated, user?.sub]);

  useEffect(() => {
    // Fetch distinct item count whenever cart changes
    if (isAuthenticated) {
      axios
        .get(`https://ecommerce-backend-b71d.onrender.com/getDistinctItemCount/${user?.sub}`)
        .then((response) => {
          setDistinctItemCount(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching distinct item count:", error);
        });
    }
  }, [cartVisible, isAuthenticated, user?.sub]);

  return (
    <div className="logo-div2">
      <Link to="/" className="ishop">
        iSHOP
      </Link>
      <div className="right">
        <div className="searchDiv">
          <input
            placeholder="Search Item"
            className="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="iconBlack " onClick={handleSearch} />

          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((result) => (
                <div className="search-item" key={result.id}>
                  {result.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <Link to="/cart">
          <ShoppingCart
            className="iconLogo"
            onClick={() => toggleCart()}
          />
          <div className="cart-count">{distinctItemCount}</div>
        </Link>
        <Link to="/profile" className="link2">
          {isAuthenticated && (
            <img className="profileImg" src={user.picture} alt="img" />
          )}
        </Link>
        <div
          className="user2"
          onMouseEnter={toggleUserMenu}
          onMouseLeave={toggleUserMenu}
        >
          <Link to="/profile" className="link2">
            {isAuthenticated && (
              <p className="iconLogoName">{user.name}</p>
            )}
          </Link>
          {userMenuVisible && (
            <div className="user-menu">
              <ul>
                {/* Add user menu items here */}
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
          <button
            className="btn"
            onClick={() => {
              loginWithRedirect();
            }}
          >
            Log In
          </button>
        )}
        {isAuthenticated && onLoginSuccess()}
      </div>
    </div>
  );
}

export default Logo;
