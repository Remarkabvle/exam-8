import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeAll } from "../../context/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";

// Function to send a message to Telegram
const sendMessageToTelegram = async (message) => {
  const BOT_TOKEN = '7313879684:AAH0lhoKddXhkYP-YO5QnYueauqqT3J9hzE'; // Replace with your bot token
  const CHAT_ID = '-1002180292093'; // Replace with your chat ID

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const params = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'Markdown', // Optional, for formatting
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Message sent:', result);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const Checkout = () => {
  const [form, setForm] = useState({
    cardNumber: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });

  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirmPurchase = async () => {
    const productDetails = cart
      .map(
        (product, index) => `${index + 1}. ${product.title} - $${product.price}`
      )
      .join("\n");
    const message = `
      New Purchase:
      ${productDetails}

      Customer Information:
      Name: ${form.firstName} ${form.lastName}
      Address: ${form.address}
      Email: ${form.email}
    `;

    try {
      await sendMessageToTelegram(message);
      toast.success("Purchase confirmed!");
      dispatch(removeAll());
      navigate("/");
    } catch (error) {
      toast.error("Failed to confirm purchase.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Checkout
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box mb={4}>
            {cart.map((product) => (
              <Card key={product.id} variant="outlined" sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  image={product?.urls[0]}
                  alt={product.title}
                  sx={{ width: 100, height: 100, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${product.price * product.amount}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', marginBottom:'100px' }}>
            <TextField
              label="Credit Card Number"
              type="number"
              placeholder="1234 5678 9012 3456"
              name="cardNumber"
              required
              value={form.cardNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              required
              value={form.firstName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              type="text"
              name="lastName"
              required
              value={form.lastName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Address"
              type="text"
              name="address"
              required
              value={form.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{backgroundColor:'black', color: 'white', padding:'10px'}}
              disabled={
                !form.cardNumber ||
                !form.firstName ||
                !form.lastName ||
                !form.address ||
                !form.email
              }
              onClick={handleConfirmPurchase}
              sx={{ mt: 2 }}
            >
              Confirm Purchase
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
