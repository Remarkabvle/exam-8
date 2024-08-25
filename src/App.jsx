import { Shop } from "@mui/icons-material";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Checkout from "./pages/checkout/Checkout";
import ShopF from "./pages/shop/Shop";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Details from "./pages/details/Detail";
import Wishlist from "./pages/wishlist/Wishlist";
import ProductCreate from "./pages/productCreate/ProductsCreate";
import ProductManage from "./pages/productManage/ProductManage";
import CategoryCreate from "./pages/categoryCreate/CategoryCreate";
import CategoryManage from "./pages/categoryManage/CategoryManage";
import Login from "./pages/login/Login";
import Auth from "./pages/auth/Auth";
import Admin from "./pages/admin/Admin";
import Layout from "./components/layout/Layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shop" element={<ShopF />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin" element={<Admin />}>
            <Route path="productCreate" element={<ProductCreate />} />
            <Route path="productManage" element={<ProductManage />} />
            <Route path="categoryCreate" element={<CategoryCreate />} />
            <Route path="categoryManage" element={<CategoryManage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
