import React, { useState, useEffect, memo } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";

const Overlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker semi-transparent overlay
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

const EditModuleWrapper = styled(Box)({
  padding: '2rem',
  width: '800px', // Increased width
  maxHeight: '80vh',
  overflowY: 'auto',
  backgroundColor: '#fff', // White background
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slightly darker shadow
  color: '#000', // Black text
});

const EditModule = ({ data, onUpdate, setShowEditModule }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    units: "",
    urls: [],
    info: "",
    available: true,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        price: data.price || 0,
        stock: data.stock || 0,
        units: data.units || "",
        urls: data.urls || [],
        info: String(data.info || ""),
        available: data.available !== undefined ? data.available : true,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "urls" ? value.split(",").map((url) => url.trim()) : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Overlay>
      <EditModuleWrapper>
        <Typography variant="h6" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: '#000' } }} // Black label
              InputProps={{ style: { color: '#000' } }} // Black text
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: '#000' } }} // Black label
              InputProps={{ style: { color: '#000' } }} // Black text
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: '#000' } }} // Black label
              InputProps={{ style: { color: '#000' } }} // Black text
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#000' } }} // Black label
              InputProps={{ style: { color: '#000' } }} // Black text
            />
          </Box>

          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel>Units</InputLabel>
              <Select
                name="units"
                value={formData.units}
                onChange={handleChange}
                required
                label="Units"
                inputProps={{ style: { color: '#000' } }} // Black text
              >
                <MenuItem value="">Select a unit</MenuItem>
                <MenuItem value="kg">Kilograms (kg)</MenuItem>
                <MenuItem value="m">Meters (m)</MenuItem>
                <MenuItem value="litr">Liters (litr)</MenuItem>
                <MenuItem value="dona">Units (dona)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Image URLs"
              name="urls"
              value={formData.urls.join(", ")}
              onChange={handleChange}
              placeholder="Enter URLs separated by commas"
              InputLabelProps={{ style: { color: '#000' } }} // Black label
              InputProps={{ style: { color: '#000' } }} // Black text
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Additional Info"
              name="info"
              multiline
              rows={4}
              value={formData.info}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: '#000' } }} // Black label
              InputProps={{ style: { color: '#000' } }} // Black text
            />
          </Box>

          <Box mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  color="default" // Black checkbox
                />
              }
              label="Available"
              labelPlacement="end"
              sx={{ color: '#000' }} // Black label
            />
          </Box>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<AiOutlineCheck />}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowEditModule(false)}
              startIcon={<AiOutlineClose />}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </EditModuleWrapper>
    </Overlay>
  );
};

export default memo(EditModule);
