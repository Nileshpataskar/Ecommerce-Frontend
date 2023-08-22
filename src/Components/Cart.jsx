import React from "react";
import "../CSS/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/cartAction";
import { increaseQuantity, decreaseQuantity } from "../Redux/cartAction";
import Logo from './Logo';
import Navbar from './Navbar';
function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch(); 
  const individualItemTotal = (item) => item.price * item.quantity;
  const totalPrice = cartItems.reduce(
    (total, item) => total + individualItemTotal(item),
    0
  );
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId)); // Dispatch the action to remove item from cart
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    
    const currentItem = cartItems.find(item => item.id === itemId);
    if (currentItem && currentItem.quantity > 1) {
      dispatch(decreaseQuantity(itemId));
    } else {
      dispatch(removeFromCart(itemId)); // Remove the item when quantity is 0 or less
    }
  };

  return (
    <>
    <Logo/>
    <Navbar/>
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems && cartItems.length > 0 ? (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.thumbnail} alt={item.name} className="cart-image" />
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
            <p className="totalPrice">Total Price:  {totalPrice} ₹</p>
            <button
                className="remove-from-cart"
                
              >
                Checkout
              </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div></>
  );
}

export default Cart;
