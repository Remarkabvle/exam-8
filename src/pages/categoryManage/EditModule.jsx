import React, { useState, memo, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import "./editModule.scss";

const EditModule = ({ data, onUpdate, setShowEditModule }) => {
  const [formData, setFormData] = useState({ title: "" });

  useEffect(() => {
    if (data) {
      setFormData({ title: data.title });
    }
  }, [data]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ title: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setShowEditModule(false);
  };

  return (
    <Box className="edit-module" sx={{ width: 400, p: 3, bgcolor: "background.paper", boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Edit Category
      </Typography>
      <form onSubmit={handleSubmit} className="edit-form">
        <Box mb={2}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => setShowEditModule(false)}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default memo(EditModule);
