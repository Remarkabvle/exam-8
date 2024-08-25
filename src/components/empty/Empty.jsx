import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa"; // Import React icon
import "./empty.scss";

const Empty = ({ url, title }) => {
  let navigate = useNavigate();
  return (
    <div className="empty-container">
      <FaShoppingBag size={80} color="black" />
      <h2 style={{ color: "black", fontWeight: "600" }}>Your {title} is empty</h2>
      <p  style={{ color: "black", fontSize: '16px', maxWidth: '500px', textAlign: 'center', margin:'0 auto', paddingTop:'10px', paddingBottom:'10px'  }}>Start exploring our products and add your favorites here to keep track of the items you love. Happy shopping!</p>
      <div style={{ display: "flex", gap: "10px", justifyContent:'center' }}>
        <button
          onClick={() => navigate("/shop")}
          style={{ background: "black" }}
          className="start-shopping-btn"
        >
          Start Shopping
        </button>
        <button
          onClick={() => navigate("/")}
          style={{ background: "black" }}
          className="start-shopping-btn"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default memo(Empty);
