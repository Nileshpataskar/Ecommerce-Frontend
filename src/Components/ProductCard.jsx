import React, { useState } from "react";
import "../CSS/ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateDistinctItemCount } from "../Redux/cartAction";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storeTempData } from "../Redux/tempDataAction";
function ProductCard({ product }) {
  const [refresh, setRefresh] = useState(false); // Add this state
  const { name, title, thumbnail, price, rating, brand } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isAuthenticated, user } = useAuth0();
  const [distinctItemCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);

  const navigate = useNavigate();

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

  const handleAddToCart = async () => {
    if (isAuthenticated) {
      try {
        const existingCartItem = cartItems.find(
          (item) => item.id === product.id
        );

        if (existingCartItem) {
          toast.info("Item is already in the cart", {
            position: "top-right",
            autoClose: 1000,
            theme: "dark",
            hideProgressBar: true,
          });
        } else {
          await axios.post(
            "https://ecommerce-backend-b71d.onrender.com/addtocart",
            {
              user_id: user.sub,
              ...product,
            }
          );

          // fetchDistinctItemCount(user, isAuthenticated, setDistinctItemCount);
          dispatch(updateDistinctItemCount(distinctItemCount + 1));

          dispatch(addToCart(product));
          toast.success("Added to cart", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
            hideProgressBar: true,
          });
          setRefresh(!refresh);
          setAnimateCart(true);
          setTimeout(() => setAnimateCart(false), 500);
        }
      } catch (error) {
        toast.error("Error adding to cart", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          hideProgressBar: true,
        });
      }
    } else {
      toast.warning("Please log in to add items to the cart", {
        position: "top-right",
        autoClose: 2000,
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
      <div onClick={handleStoreDataAndRedirect} product={product}>
        <img src={thumbnail} alt={name} className="product-image" />
        <h2 className="product-title">{title}</h2>
        <h2 className="product-title">{brand}</h2>

        <div className="product-rating">{renderStarRating(rating)}</div>
        <p className="product-price">Price: {price} ₹</p>
      </div>
      {/* <button
        className={`add-to-cart ${animateCart ? "animate-cart" : ""}`}
        onClick={(e) => {
          handleAddToCart();
          e.currentTarget.blur(); // Remove focus to prevent repeated animation
        }}
      >
        Add to Cart
      </button> */}

      <button class="CartBtn" onClick={(e) => {
          handleAddToCart();
          e.currentTarget.blur(); // Remove focus to prevent repeated animation
        }}>
        <span class="IconContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
            fill="rgb(17, 17, 17)"
            class="cart"
          >
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>
        </span>
        <p class="text">Add to Cart</p>
      </button>
    </div>
  );
}

export default ProductCard;
