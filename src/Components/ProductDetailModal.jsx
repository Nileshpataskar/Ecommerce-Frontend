import React from "react";
import "../CSS/ProductDetailsModal.css"; // Import your CSS for styling

function ProductDetailsModal({ product, onAddToCart, onClose }) {
  // Destructure product properties
  const { title, brand, description, price, thumbnail } = product;

  return (
    <div className="product-details-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="product-details-content">
          <div className="product-image">
            <img src={thumbnail} alt={title} />
          </div>
          <div className="product-info">
            <h2 className="product-title">{title}</h2>
            <p className="brand">{brand}</p>
            <p className="description">{description}</p>
            <p className="price">Price: {price} ₹</p>
            <button className="add-to-cart" onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;
