import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./NavComponents/Home.jsx";
import Store from "./NavComponents/Store";
import Ipad from "./NavComponents/Ipad";
import Mackbook from "./NavComponents/Mackbook";
import Accesories from "./NavComponents/Accesories";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Components/ProductDetails";
import ReduxPage from "./Components/ReduxPage";
import All from "./NavComponents/All";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/all" element={<All />} />
        <Route path="/ipad" element={<Ipad />} />
        <Route path="/macbook" element={<Mackbook />} />
        <Route path="/accesories" element={<Accesories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" component={ProductDetails} />
        <Route path="/inforedux" element={<ReduxPage />} />
    
      </Routes>
      <ToastContainer />
    </div>
  );
}
export default App;
