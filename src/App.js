import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./NavComponents/Home.jsx";
import Store from "./NavComponents/Store";
import Mackbook from "./NavComponents/Mackbook";
import Accesories from "./NavComponents/Accesories";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxPage from "./Components/ReduxPage";
import All from "./NavComponents/All";
import Footer2 from "./Components/Footer2";
import Laptop from "./NavComponents/Laptop";
import Book from "./NavComponents/Book";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/all" element={<All />} />
        <Route path="/accesories" element={<Accesories/>} />
        <Route path="/book" element={<Book/>} />

        <Route path="/laptop" element={<Laptop />} />
        <Route path="/macbook" element={<Mackbook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/inforedux" element={<ReduxPage />} />
    
      </Routes>
      <Footer2/>
      <ToastContainer />
    </div>
  );
}
export default App;
