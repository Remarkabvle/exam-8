import React, { useState, useEffect } from "react";
import "./header.scss";
import { NavLink } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo.svg";

const CustomHeader = () => {
  const [inputValue, updateInputValue] = useState("");
  const [isDropdownVisible, toggleDropdown] = useState(false);
  const [isSearchActive, activateSearch] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeTopBar = () => {
    setTopBarVisible(false);
  };

  const closeAll = () => {
    toggleDropdown(false);
    activateSearch(false);
    updateInputValue("");
    setMenuOpen(false);
  };

  const wishlistItems = useSelector((state) => state.wishlist.value);
  const cartItems = useSelector((state) => state.cart.value);

  const totalCartItems = cartItems ? cartItems.length : 0;
  const totalWishlistItems = wishlistItems ? wishlistItems.length : 0;

  return (
    <>
      {topBarVisible && (
        <div className="top-bar">
          <div className="container bar-container">
            <div className="top-bar__text">
              Sign up and get 20% off your first order.
              <a href="#signup">Sign Up Now</a>
            </div>
            <button className="top-bar__close" onClick={closeTopBar}>
              &times;
            </button>
          </div>
        </div>
      )}
      <header className={scrolled ? "scrolled" : ""}>
        <div className="custom-header">
          <nav className="custom-header__navigation container">
            <NavLink className="custom-logo" to="/">
              <img src={logo} alt="Logo" />
            </NavLink>
            <div className="menu-icon" onClick={() => setMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
            <ul className={`custom-navigation__list ${isMenuOpen ? "visible" : ""}`}>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/sale">On Sale</NavLink>
              <NavLink to="/new">New Arrivals</NavLink>
              <NavLink to="/brands">Brands</NavLink>
            </ul>
            <div className="search-input">
              <AiOutlineSearch className="search-icon" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => updateInputValue(e.target.value)}
                placeholder="Search for products..."
              />
            </div>
            <ul className="icon-links">
              <NavLink className="wishlist-link" to="/wishlist">
                <MdFavoriteBorder />
                <sup>{totalWishlistItems}</sup>
              </NavLink>
              <NavLink className="cart-link" to="/cart">
                <BiCart />
                <sup>{totalCartItems}</sup>
              </NavLink>
              <NavLink to="/admin/productManage">
                <RiAccountCircleLine />
              </NavLink>
            </ul>
          </nav>
        </div>
      </header>
      {isMenuOpen && <div className="overlay" onClick={closeAll}></div>}
      <div className="fixed-icons">
        <ul className="icon-links">
          <NavLink className="wishlist-link" to="/wishlist">
            <MdFavoriteBorder />
            <sup>{totalWishlistItems}</sup>
          </NavLink>
          <NavLink className="cart-link" to="/cart">
            <BiCart />
            <sup>{totalCartItems}</sup>
          </NavLink>
          <NavLink to="/admin/productManage">
            <RiAccountCircleLine />
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default CustomHeader;
