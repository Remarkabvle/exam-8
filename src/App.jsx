import { Shop } from "@mui/icons-material";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";


let Checkout = lazy(() => import("./pages/checkout/Checkout"));
let ShopF = lazy(() => import("./pages/shop/Shop"));
let Home = lazy(() => import("./pages/home/Home"));
let Cart = lazy(() => import("./pages/cart/Cart"));
let Details = lazy(() => import("./pages/details/Detail"));
let Wishlist = lazy(() => import("./pages/wishlist/Wishlist"));
let ProductCreate = lazy(() => import("./pages/productCreate/ProductsCreate"));
let ProductManage = lazy(() => import("./pages/productManage/ProductManage"));
let CategoryCreate = lazy(() =>
  import("./pages/categoryCreate/CategoryCreate")
);
let CategoryManage = lazy(() =>
  import("./pages/categoryManage/CategoryManage")
);
let Login = lazy(() => import("./pages/login/Login"));
let Auth = lazy(() => import("./pages/auth/Auth"));
let Admin = lazy(() => import("./pages/admin/Admin"));
let Layout = lazy(() => import("./components/layout/Layout"));

import { ToastContainer, toast } from "react-toastify";
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
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shop" element={<ShopF/>} />


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
