import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div className="product-details">
      <h1>{product?.title}</h1>
      <img src={product?.urls[0]} alt="img" />
      <p>{product?.description}</p>
    </div>
  );
};

export default ProductDetails;
