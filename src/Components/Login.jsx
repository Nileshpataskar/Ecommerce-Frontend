import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css";

function Login() {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

 

    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.error("Token not available");
      return;
    }
    let formIsValid = true;
    const newErrors = { ...errors };

    if (formData.email === "") {
      newErrors.email = "Email is required";
      formIsValid = false;
    }

    if (formData.password === "") {
      newErrors.password = "Password is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`, // Add this line
          },
        }
      );

      console.log("Login successful:", response.data);

      // Store the JWT token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to the profile page after successful login
      navigate("/profile");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="loginmain">
        <h1 className="login-ishop">
          <Link className="login-ishop" to="/">
            iSHOP
          </Link>
        </h1>

        <div id="div-loginform">
          <form id="loginform">
            <input
              id="loginEmail"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <input
              id="loginPassword"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}

            <button id="submit" type="submit" onClick={handleSubmit}>
              Login
            </button>

            <Link to="/register" className="register-link">
              New User!! Register here..
            </Link>
          </form>
        </div>
      </div>
  );
}

export default Login;
