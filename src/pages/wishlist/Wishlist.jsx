import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidCartAdd } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { remove, add, decreaseAmount, increaseAmount } from "../../context/slices/cartSlice.js";
import { toggleHeart } from "../../context/slices/wishlistSlice.js";
import './wishlist.scss'
import Empty from "../../components/empty/Empty.jsx";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.value);
  const cartItems = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  if (!wishlistItems || wishlistItems.length === 0) {
    return <Empty title="Wishlist" />;
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title" style={{textAlign:'center', marginBottom:'40px'}}>Your Wishlist</h1>
      <div className="wishlist-grid" style={{marginBottom:'100px'}}>
        {wishlistItems.map((product) => (
          <div className="wishlist-card" key={product._id}>
            <div className="card-header">
              {cartItems.some((el) => el._id === product._id) ? (
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => dispatch(decreaseAmount(cartItems.find((el) => el._id === product._id)))}
                  >
                    -
                  </button>
                  <span className="item-quantity">
                    {cartItems.find((el) => el._id === product._id).amount}
                  </span>
                  <button
                    className="quantity-btn"
                    onClick={() => dispatch(increaseAmount(cartItems.find((el) => el._id === product._id)))}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="add-to-cart-btn"
                  onClick={() => dispatch(add(product))}
                >
                  <BiSolidCartAdd />
                </button>
              )}
              <button
                className={`wishlist-btn ${wishlistItems.some((el) => el._id === product._id) ? "active-heart" : ""}`}
                onClick={() => dispatch(toggleHeart(product))}
              >
                {wishlistItems.some((el) => el._id === product._id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            <img
              src={product.urls[0]}
              alt={product.title}
              className="wishlist-image"
            />
            <div className="wishlist-details">
              <h5 className="wishlist-title">{product.title}</h5>
              <div className="price-section">
                <div className="price-info">
                  <span className="current-price">${product.price}</span>
                  {product.price < product.oldPrice && (
                    <>
                      <span className="old-price">${product.oldPrice}</span>
                      <span className="discount-percentage">
                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
