import React, { useState } from "react";
import "../CSS/ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartAction";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import axios from 'axios';

function ProductCard({ product }) {

  const [refresh, setRefresh] = useState(false); // Add this state

  const { name, title, thumbnail, price, rating, brand } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isAuthenticated, user } = useAuth0();

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
        const existingCartItem = cartItems.find((item) => item.id === product.id);

        if (existingCartItem) {
          toast.info("Item is already in the cart", {
            position: "top-right",
            autoClose: 1000,
            theme: "dark",
            hideProgressBar: true,
          });
        } else {
          await axios.post("http://localhost:2001/addtocart", {
            user_id: user.sub,
            ...product,
          });

          dispatch(addToCart(product));
          toast.success("Added to cart", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
            hideProgressBar: true,
          });
          setRefresh(!refresh);

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

  return (
    <div className="product-card">
      <div onClick={handleAddToCart}>
        <img src={thumbnail} alt={name} className="product-image" />
        <h2 className="product-title">{title}</h2>
        <h2 className="product-title">{brand}</h2>

        <div className="product-rating">{renderStarRating(rating)}</div>
        <p className="product-price">Price: {price} ₹</p>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
