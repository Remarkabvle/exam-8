import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaTrashCan } from "react-icons/fa6";
import Empty from "../../components/empty/Empty";
import {
  decreaseAmount,
  increaseAmount,
  remove,
} from "../../context/slices/cartSlice";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Card,
  CardMedia,
  TextField,
  Paper,
  Divider,
} from "@mui/material";
import "./Cart.scss"; // Import the SCSS file

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.value);

  const calculateTotal = () => {
    return cartData.reduce((total, product) => total + product.price * product.amount, 0);
  };

  const discount = calculateTotal() * 0.2;
  const deliveryFee = 15;
  const total = calculateTotal() + deliveryFee - discount;

  if (!cartData.length) {
    return <Empty title="Cart" />;
  }

  return (
    <Container maxWidth="lg" className="cart-container">
      <Typography variant="h4" className="cart-title">
        YOUR CART
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartData.map((product) => (
            <Card key={product._id} className="cart-item">
              <CardMedia
                component="img"
                className="cart-item-media"
                image={product?.urls[0]}
                alt={product.title}
              />
              <Box className="cart-item-details">
                <Typography
                  component={Link}
                  to={`/product/${product._id}`}
                  className="cart-item-title"
                >
                  {product.title}
                </Typography>
                <Typography className="cart-item-info">
                  Size: {product.size}, Color: {product.color}
                </Typography>
                <Typography className="cart-item-price">
                  ${product.price}
                </Typography>
              </Box>
              <Box className="amount-controls">
                <button
                  onClick={() => dispatch(decreaseAmount(product))}
                  disabled={product.amount === 1}
                >
                  -
                </button>
                <Typography className="amount">{product.amount}</Typography>
                <button
                  onClick={() => dispatch(increaseAmount(product))}
                  disabled={product.amount === product.stock}
                >
                  +
                </button>
              </Box>
              <IconButton
                aria-label="remove"
                onClick={() => dispatch(remove(product))}
                className="remove-button"
              >
                <FaTrashCan />
              </IconButton>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="order-summary">
            <Typography variant="h5" className="summary-title">
              Order Summary
            </Typography>
            <Box mb={2}>
              <Typography className="summary-item">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </Typography>
              <Typography className="summary-item discount">
                <span>Discount (-20%)</span>
                <span>-${discount}</span>
              </Typography>
              <Typography className="summary-item">
                <span>Delivery Fee</span>
                <span>${deliveryFee}</span>
              </Typography>
              <Divider />
              <Typography className="summary-item total">
                <span>Total</span>
                <span>${total}</span>
              </Typography>
            </Box>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Add promo code"
              className="promo-code"
            />
            <Button
              variant="contained"
              fullWidth
              className="checkout-button apply-button"
            >
              Apply
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/checkout")}
              className="checkout-button"
              endIcon={<FaArrowRight />}
            >
              Go to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
