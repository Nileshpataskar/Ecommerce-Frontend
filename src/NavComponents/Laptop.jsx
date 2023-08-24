import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../Redux/cartAction";
import Logo from "../Components/Logo";
import Navbar from "../Components/Navbar";
import NavDesktop from "../Components/NavDesktop";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import { useDispatch } from "react-redux";

const Laptop = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [visibleProductCount, setVisibleProductCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("smartphones"); // Default to 'all'
  const [selectedBrand, setSelectedBrand] = useState(""); // Default to 'all'
  const [totalProducts, setTotalProducts] = useState(0); // Track total number of products

  const dispatch = useDispatch();

  useEffect(() => {
    let url = "https://ecommerce-backend-b71d.onrender.com/getcategory/laptop";


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
      )}
    </div>
  );
};

export default Laptop;

// import React, { useEffect, useState } from 'react'
// import ProductCard from '../Components/ProductCard';
// import axios from 'axios';
// // import Logo from '../Components/Logo'
// // import Navbar from '../Components/Navbar'
// import "../CSS/Iphone.css"
// import Navbar from '../Components/Navbar';

// const Iphone = () => {

//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // Fetch products from the API and update the state
//     axios.get("http://localhost:7000/api/dummy")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   const handleAddToCart = (product) => {
//     setCartItems([...cartItems, product]);
//   };

//   return (
//     <div>
//       <Navbar/>

//       <div className="product-container2">
//         {products.map((product, index) => (
//           <ProductCard
//             key={index}
//             product={product}
//             onAddToCart={handleAddToCart}
//           />
//         ))}
//       </div>
//     </div>
//   );

// }

// export default Iphone
