import React from "react";
import "../CSS/Profile.css";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "./Logo";
// import Navbar from "./Navbar";
const Profile = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <Logo />
      {/* <Navbar/> */}

      <div className="profile-container">
        <div className="profile-card">
          {isAuthenticated && (
            <img
              className="profile-image"
              src={user.picture}
              alt={user.birthdate}
            />
          )}
          {isAuthenticated && <h2 className="profile-name">{user.name}</h2> }
          {isAuthenticated && <h3 className="">{user.email}</h3>}



          {isAuthenticated ? (
            <button
              className="btn-in-profile"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </button>
          ) : (
            <button
              className="btn-in-profile"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
