import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Empty from "../../components/empty/Empty.jsx";
import { BiSolidCartAdd } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { remove, add, decreaseAmount, increaseAmount } from "../../context/slices/cartSlice.js";
import { toggleHeart } from "../../context/slices/wishlistSlice.js";
import { Button, Card, CardContent, CardMedia, Typography, Grid, IconButton, Box } from "@mui/material";
import { styled } from '@mui/material/styles';

// Styled components with a completely different design approach
const WishlistWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: '#f4f4f4',
  minHeight: '100vh',
}));

const CardWrapper = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'box-shadow 0.3s, transform 0.3s',
  '&:hover': {
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
    transform: 'translateY(-5px)',
  },
}));

const CardImage = styled(CardMedia)(({ theme }) => ({
  height: 180,
  backgroundSize: 'cover',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: '0 0 10px 10px',
  textAlign: 'left',
}));

const PriceWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

const QtyControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const QtyButton = styled(Button)(({ theme }) => ({
  minWidth: 30,
  height: 30,
  padding: 0,
  fontSize: '1.25rem',
  borderRadius: '50%',
  borderColor: '#ccc',
  color: '#333',
}));

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.value);
  const cartItems = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  if (!wishlistItems || wishlistItems.length === 0) {
    return <Empty title="Wishlist" />;
  }

  return (
    <WishlistWrapper>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Your Wishlist
      </Typography>
      <Grid container spacing={3}>
        {wishlistItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <CardWrapper>
              <CardImage
                component="img"
                image={product.urls[0]}
                alt={product.title}
              />
              <CardContentWrapper>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <PriceWrapper>
                  <Typography variant="h5" color="primary">
                    ${product.price}
                  </Typography>
                  {product.price < product.oldPrice && (
                    <>
                      <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through', ml: 2 }}>
                        ${product.oldPrice}
                      </Typography>
                      <Typography variant="body2" color="error" sx={{ ml: 2 }}>
                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                      </Typography>
                    </>
                  )}
                </PriceWrapper>
              </CardContentWrapper>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                {cartItems.some((el) => el._id === product._id) ? (
                  <QtyControls>
                    <QtyButton
                      variant="outlined"
                      onClick={() => dispatch(decreaseAmount(cartItems.find((el) => el._id === product._id)))}
                    >
                      -
                    </QtyButton>
                    <Typography variant="body1">{cartItems.find((el) => el._id === product._id).amount}</Typography>
                    <QtyButton
                      variant="outlined"
                      onClick={() => dispatch(increaseAmount(cartItems.find((el) => el._id === product._id)))}
                    >
                      +
                    </QtyButton>
                  </QtyControls>
                ) : (
                  <IconButton
                    onClick={() => dispatch(add(product))}
                    color="primary"
                    sx={{ borderRadius: '50%' }}
                  >
                    <BiSolidCartAdd />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => dispatch(toggleHeart(product))}
                  color={wishlistItems.some((el) => el._id === product._id) ? "secondary" : "default"}
                >
                  {wishlistItems.some((el) => el._id === product._id) ? <FaHeart /> : <FaRegHeart />}
                </IconButton>
              </Box>
            </CardWrapper>
          </Grid>
        ))}
      </Grid>
    </WishlistWrapper>
  );
};

export default Wishlist;
