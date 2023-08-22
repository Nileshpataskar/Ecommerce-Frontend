import React from "react";
import "../CSS/Footer.css";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="f1">
          <h3>Nilesh Pataskar</h3>
          <p>nileshpataskars@gmail.com</p>
          <p>8888082914</p>
          <p>
            This is a E-Commerce project built using React and used
            NodeJs/Express to build Backend
          </p>
        </div>

        <div className="social">
          <span className="icon">
            <a
              href="https://www.facebook.com/nilesh.pataskar.1"
              target="_blank"
            >
              <Facebook />
            </a>
          </span>
          <span className="icon">
            <a
              href="https://www.instagram.com/__nilesh_pataskar__/"
              target="_blank"
            >
              <Instagram />
            </a>
          </span>
          <span className="icon">
            <a href="https://github.com/Nileshpataskar" target="_blank">
              <Github />
            </a>
          </span>
          <span className="icon">
            <a
              href="https://www.linkedin.com/in/nilesh-pataskar-96a6441b1/"
              target="_blank"
            >
              <Linkedin />
            </a>
          </span>
        </div>
        <div className="f1">
          <h3>Pages</h3>
          <p>
            <Link to="/profile">Profile</Link>
          </p>

          <p>
            <Link to="/store">Store</Link>
          </p>
          <p>
            <Link to="/cart">Cart</Link>
          </p>
          <p>
            <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
