import React, { useState } from "react";
import './products.scss';
import { useGetProductsQuery } from "../../context/api/productApi";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toggleHeart } from "../../context/slices/wishlistSlice";
import { add, decreaseAmount, increaseAmount, remove } from "../../context/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidCartAdd } from "react-icons/bi";
import Loading from "../loading/Loading";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ProductList = ({ isAdmin, adminData, onDelete, onEdit }) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  let {
    data: productList,
    isLoading,
    isFetching,
  } = useGetProductsQuery({ limit: itemsPerPage });
  let dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);
  const wishlist = useSelector((state) => state.wishlist.value);
  let data = isAdmin ? adminData : productList;

  const openDeleteDialog = (productId) => {
    setSelectedProduct(productId);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      onDelete(selectedProduct);
      setDialogOpen(false);
    }
  };

  if (isLoading || isFetching) {
    return isLoading || isFetching ? <Loading count={12} /> : null;
  }

  return (
    <div className="products-container container">
      <div className="products-grid">
        {data?.payload?.map((product) => (
          <div key={product?._id} className="product-card">
            <div className="card-header">
              {cartItems?.some((item) => item?._id === product?._id) ? (
                <div className="quantity-controls">
                  {cartItems.find((item) => item?._id === product?._id)?.amount === 1 ? (
                    <button
                      onClick={() =>
                        dispatch(
                          remove(
                            cartItems?.find((item) => item?._id === product?._id)
                          )
                        )
                      }
                      className="quantity-btn"
                    >
                      -
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseAmount(
                            cartItems.find((item) => item?._id === product?._id)
                          )
                        )
                      }
                      className="quantity-btn"
                    >
                      -
                    </button>
                  )}
                  <span className="item-quantity">
                    {cartItems.find((item) => item?._id === product?._id)?.amount}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        increaseAmount(
                          cartItems.find((item) => item?._id === product?._id)
                        )
                      )
                    }
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => dispatch(add(product))}
                  className="add-to-cart-btn"
                >
                  <BiSolidCartAdd />
                </button>
              )}
              <button
                onClick={() => dispatch(toggleHeart(product))}
                className={`wishlist-btn ${
                  wishlist?.some((item) => item?._id === product?._id) ? "active-heart" : ""
                }`}
              >
                {wishlist?.some((item) => item?._id === product?._id) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>
            <Link to={`/product/${product?._id}`}>
              <img
                src={product?.urls[0]}
                alt="product-img"
                className="product-image"
              />
            </Link>
            <div className="product-details">
              <h3 className="product-title">{product?.title}</h3>
              <div className="price-section">
                {isAdmin && (
                  <div className="admin-controls">
                    <button
                      onClick={() => openDeleteDialog(product?._id)}
                      className="delete-btn"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="edit-btn"
                    >
                      <MdEditSquare />
                    </button>
                  </div>
                )}
                <div className="price-info">
                  <h2 className="current-price">${product?.price}</h2>
                  {product?.price < product?.oldPrice && (
                    <>
                      <h2 className="old-price">${product?.oldPrice}</h2>
                      <span className="discount-percentage">
                        -{Math.round(((product?.oldPrice - product?.price) / product?.oldPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isAdmin && (
        <button
          onClick={() => navigate('/shop')} // Adjust the path to your shop page route
          disabled={isFetching || isLoading}
          className="load-more-btn"
        >
          {isLoading || isFetching ? "Loading..." : "View All"}
        </button>
      )}

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{"Delete Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
