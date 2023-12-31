import React, { useCallback, useEffect, useState } from "react";
import "../CSS/Cart.css";
import Logo, { fetchDistinctItemCount } from "./Logo";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/cartAction";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import NavDesktop from "./NavDesktop";

function Cart() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userId = isAuthenticated ? user.sub : null;
  const [cartData, setCartData] = useState([]);
  const [removedItem, setRemovedItem] = useState([]);

  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    return cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      dispatch(removeFromCart(itemId)); // Dispatch the action to remove item from cart
      await axios.delete(
        `https://ecommerce-backend-b71d.onrender.com/removefromcart/${userId}/${itemId}`
      );
      fetchCartData(); // Fetch updated cart data after removal
      fetchDistinctItemCount();
      setRemovedItem([...removedItem, itemId]);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleIncreaseQuantity = async (itemId) => {
    try {
      await axios.put(
        `https://ecommerce-backend-b71d.onrender.com/updateCartItemQuantity/${userId}/${itemId}`,
        {
          change: 1, // Increase by 1
        }
      );
      fetchCartData(); // Fetch updated cart data after updating quantity
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    try {
      const currentItem = cartData.find((item) => item.id === itemId);
      if (currentItem && currentItem.quantity > 1) {
        await axios.put(
          `https://ecommerce-backend-b71d.onrender.com/updateCartItemQuantity/${userId}/${itemId}`,
          {
            change: -1, // Decrease by 1
          }
        );
        fetchCartData(); // Fetch updated cart data after updating quantity
      } else {
        await axios.delete(
          `https://ecommerce-backend-b71d.onrender.com/removefromcart/${userId}/${itemId}`
        );
        fetchCartData(); // Fetch updated cart data after removal
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCartData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-backend-b71d.onrender.com/fetchcartbyuser/${userId}`
      );
      setCartData(response.data.Result);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  });

  const handleCheckout = async () => {
    try {
      // Remove all items from the cart for the specific user
      // await axios.delete(`http://localhost:2001/checkout/${userId}`
      await axios.delete(
        `https://ecommerce-backend-b71d.onrender.com/deleteall`
      );

      // Fetch updated cart data
      fetchCartData();

      // Show success toast message
      toast.success("You have checked out successfully!");
    } catch (error) {
      console.error("Error during checkout:", error);
      // Show error toast message
      toast.error("An error occurred during checkout. Please try again.");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchCartData();
    }
  }, [userId, isLoading, fetchCartData]);

  const [isMobile, setIsMobile] = useState(false);
  // const [carouselImages, setCarouselImages] = useState([]);

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

  return (
    <>
      <Logo />
      {isMobile ? <Navbar /> : <NavDesktop />}

      <div className="cart-container">
        <h2>Cart</h2>
        {cartData && cartData.length > 0 ? (
          <div>
            {cartData.map((item, index) => (
              <div
                key={index}
                className={`cart-item ${
                  removedItem.includes(item.id) ? "fade-out" : ""
                }`}
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="cart-image"
                />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>{item.brand}</p>
                  <p>Price: {item.price} Rs</p>
                  <div className="quantity-section">
                    <button
                      className="quantity-button"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <p className="quantity-text">Quantity: {item.quantity}</p>
                    <button
                      className="quantity-button"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-from-cart"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="total-price">
              <p className="totalPrice">
                Total Price: {calculateTotalPrice()} ₹
              </p>
              <button className="remove-from-cart" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Your cart is empty</p>
           
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
