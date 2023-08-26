import { FaFacebookF, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

import "../CSS/Footer2.scss";
import { Link } from "react-router-dom";

const Footer2 = () => {
  return (
    <footer className="footer">
      <div>
        <ul className="menuItems">
          <li className="menuItem">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="menuItem">
            <Link to="/store">Store</Link>
          </li>
          <li className="menuItem">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="menuItem">
            <Link to="/">Home</Link>
          </li>
        </ul>
        <div className="infoText">
          This is a E-Commerce project built using React and used NodeJs/Express
          to build Backend
          <h3>Made By Nilesh Pataskar</h3>
        </div>
        <div className="socialIcons">
          <span className="icon">
            <a
              href="https://www.facebook.com/nilesh.pataskar.1"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
          </span>
          <span className="icon">
            <a
              href="https://www.instagram.com/__nilesh_pataskar__/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          </span>
          <span className="icon">
            <a href="https://github.com/Nileshpataskar" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </span>
          <span className="icon">
            <a
              href="https://www.linkedin.com/in/nilesh-pataskar-96a6441b1/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
