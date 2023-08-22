import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();

    let formIsValid = true;
    const newErrors = { ...errors };

    // Validate fields
    if (formData.name === "") {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    if (formData.email === "") {
      newErrors.email = "Email is required";
      formIsValid = false;
    }

    if (formData.phone === "") {
      newErrors.phone = "Phone is required";
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

    // axios
    //   .post("http://localhost:7000/api/register", formData)
    //   .then((response) => {
    //     console.log("Registration successful:", response.data);
    //     navigate('/login')

    //   })
    //   .catch((error) => {
    //     console.error("Error registering:", error);
    //   });
    axios
      .post("http://localhost:7000/api/register", formData)
      .then((response) => {
        console.log("Registration successful:", response.data);

        // Store the JWT token in localStorage
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Redirect to the login page after successful registration
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  return (
    <div className="registermain">
      <h1 className="register-ishop">
        <Link className="register-ishop" to="/">
          iSHOP
        </Link>
      </h1>

      <div id="div-registerform">
        <form id="registerform">
          <input
            id="registerName"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <input
            id="registerEmail"
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <input
            id="registerPhone"
            placeholder="Phone No"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}

          <input
            id="registerPassword"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}

          <button className="button" id="submit" type="submit" onClick={handleSubmit}>
            Register
          </button>

          <Link to="/login" className="link">
            Already User!! Log in
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
