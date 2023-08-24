import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Logo from "../Components/Logo";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import "../CSS/Store.css";
import { addToCart, removeFromCart } from "../Redux/cartAction";
import NavDesktop from "../Components/NavDesktop";
// import { Link } from 'react-router-dom';

function Store() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [visibleProductCount, setVisibleProductCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("smartphones"); // Default to 'all'
  const [selectedBrand, setSelectedBrand] = useState(""); // Default to 'all'
  const [totalProducts, setTotalProducts] = useState(0); // Track total number of products

  const dispatch = useDispatch();

  useEffect(() => {
    let url = "https://ecommerce-backend-b71d.onrender.com/getall";

    if (selectedCategory === "all") {
      url = `https://ecommerce-backend-b71d.onrender.com/getall`;
    }

    if (selectedCategory !== "smartphones") {
      url = `https://ecommerce-backend-b71d.onrender.com/getcategory/${selectedCategory}`;
    }
    if (selectedBrand !== "HP") {
      console.log(selectedBrand);
      url = `https://ecommerce-backend-b71d.onrender.com/getbrand/${selectedBrand}`;
    }

    axios
      .get(url)
      .then((response) => {
        console.log("response", response.data.Result);
        setDisplayedProducts(
          response.data.Result.slice(0, visibleProductCount)
        );
        setTotalProducts(response.data.Result.length);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [visibleProductCount, selectedCategory, selectedBrand]);

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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleLoadMore = () => {
    setVisibleProductCount(visibleProductCount + 8);
  };



  return (
    <div>
      <Logo />
      {isMobile ? (
        <Navbar
          onSelectCategory={setSelectedCategory}
          onSelectBrand={setSelectedBrand}
        />
      ) : (
        <NavDesktop
          onSelectCategory={setSelectedCategory}
          onSelectBrand={setSelectedBrand}
        />
      )}
      <div className="product-container">
        {displayedProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
      {visibleProductCount < totalProducts && (
        <button onClick={handleLoadMore}>Load More</button>
      )}{" "}
    </div>
  );
}

export default Store;
