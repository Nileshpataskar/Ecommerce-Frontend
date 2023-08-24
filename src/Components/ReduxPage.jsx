

// ReduxPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/ReduxPage.css";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { addToCart } from "../Redux/cartAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavDesktop from "./NavDesktop";

function ReduxPage() {
  const tempData = useSelector((state) => state.tempData);
  console.log(tempData);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const setSize = () => {
      const isMobile = window.innerWidth < 600;
      setIsMobile(isMobile);
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  //importing data for add to cart
  const { isAuthenticated,user } = useAuth0();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  if (!tempData) {
    return <div>Please Refresh</div>;
  }

  const handleAddToCart = async() => {
    if (isAuthenticated) {
      console.log("first")
      console.log("user",user)
     try
     { await axios.post("https://ecommerce-backend-b71d.onrender.com/addtocart", {
        user_id: user.sub, // User's sub (unique identifier) from Auth0
        ...tempData, // Include other product details
    
      });
      dispatch(addToCart(tempData));
      toast.success("Added to cart", {
        position: "top-center",
        autoClose: 200,
        theme: "dark",
        hideProgressBar: "true",
      });}
      catch(e){
console.log("in error")
      }
    } else {
        toast.error("Please log in to add to cart", {
        position: "top-center",
        autoClose: 300,
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // const [carouselImages, setCarouselImages] = useState([]);

 



  return (
    <> <Logo />
      {isMobile ? <Navbar /> : <NavDesktop />}

      <div className="redux-page">
        <h1 className="page-title">{tempData.title}</h1>
        <div className="data-container">
          <div className="image-container">
            <img
              src={tempData.thumbnail}
              alt="Product Thumbnail"
              className="product-image-redux"
            />
          </div>
          <div className="product-details">
            <div className="data-row">
              <span className="data-label">Title:</span> {tempData.title}
            </div>
            <div className="data-row">
              <span className="data-label">Brand:</span> {tempData.brand}
            </div>
            <div className="data-row">
              <span className="data-label">Category:</span> {tempData.category}
            </div>
            <div className="data-row">
              <span className="data-label">Price:</span> {tempData.price} ₹
            </div>
            <div className="data-row">
              <span className="data-label">Discount:</span>
              {tempData.discountPercentage}% off
            </div>
            <div className="data-row description">
              <span className="data-label">Description:</span>{" "}
              {tempData.description}
            </div>
            <button className="back-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="back-button" onClick={handleGoBack}>
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReduxPage;
