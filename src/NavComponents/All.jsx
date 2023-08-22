import React from 'react'
import Store from './Store'

const All = () => {
  return (
    <Store/>
  )
}

export default All

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
