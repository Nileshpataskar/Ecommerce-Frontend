

// ReduxPage.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/ReduxPage.css";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { addToCart } from "../Redux/cartAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ReduxPage() {
  const tempData = useSelector((state) => state.tempData);
  console.log(tempData);

  //importing data for add to cart
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  if (!tempData) {
    return <div>Please Refresh</div>;
  }

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(addToCart(tempData));
      toast.success("Added to cart", {
        position: "top-center",
        autoClose: 200,
        theme: "dark",
        hideProgressBar: "true",
      });
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
  return (
    <>
      <Logo />
      <Navbar />
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
              <span className="data-label">Discount:</span>{" "}
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
