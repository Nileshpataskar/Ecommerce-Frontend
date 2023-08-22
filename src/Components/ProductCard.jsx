import React from "react";
import "../CSS/ProductCard.css";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addToCart } from "../Redux/cartAction"; // Import the addToCart action

import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom"; // Import useHistory
import { storeTempData } from "../Redux/tempDataAction";
function ProductCard({ product }) {
  const { name, title, thumbnail, price, rating, brand } = product;
  const dispatch = useDispatch();
  // const tempData = useSelector((state) => state.tempData); // Access tempData from Redux store

  const navigate = useNavigate(); // Initialize useHis
  const { isAuthenticated } = useAuth0();

  // Function to generate star rating elements
  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star" role="img" aria-label="star">
          &#9733;
        </span>
      );
    }
    if (halfStar) {
      stars.push(
        <span key={fullStars} className="star" role="img" aria-label="star">
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(addToCart(product));
      toast.success("Added to cart", {
        position: "top-right",
        autoClose: 200,
        theme: "dark",
        hideProgressBar: "true",
      });
    } else {
      toast.error("Please log in to add to cart", {
        position: "top-right",
        autoClose: 300,
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };

  const handleStoreDataAndRedirect = () => {
    dispatch(storeTempData(product)); // Store the data in Redux store
    navigate("/inforedux"); // Redirect to the "redux" route
  };

  return (
    <div className="product-card">
      <div product={product} onClick={handleStoreDataAndRedirect}>
        <img src={thumbnail} alt={name} className="product-image" />
        <h2 className="product-title">{title}</h2>
        <h2 className="product-title">{brand}</h2>

        <div className="product-rating">{renderStarRating(rating)}</div>
        <p className="product-price">Price: {price} ₹</p>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>

      {/* <button
        className="view-button"
        product={product}
        onClick={handleStoreDataAndRedirect}
      >
        View
      </button> */}
    </div>
  );
}

export default ProductCard;
