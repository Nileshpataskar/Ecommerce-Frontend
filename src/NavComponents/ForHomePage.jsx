import React, { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard';
import axios from 'axios';
// import Logo from '../Components/Logo'
// import Navbar from '../Components/Navbar'
import "../CSS/Iphone.css"

const ForHomePageData = () => {
  var randomNumber = Math.floor(Math.random() * 55) + 1;

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch products from the API and update the state
    axios.get("https://ecommerce-backend-b71d.onrender.com/getall")
      .then((response) => {
        console.log("home",response.data)
        setProducts(response.data.Result);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div>
      
      <div className="product-container2">
        {products.slice(randomNumber,randomNumber+8).map((product, index) => (
          <ProductCard
            key={index+25}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );

}

export default ForHomePageData
