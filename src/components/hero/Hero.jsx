import React from "react";
import "./Hero.css"; // Make sure to include your CSS file

const Hero = () => {
  return (
    <div className="banner">
      <div className="banner__content container">
        <h1 className="banner__heading">FIND CLOTHES THAT MATCH YOUR STYLE</h1>
        <p className="banner__description">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <button className="banner__cta-button">Shop Now</button>
        <div className="banner__metrics">
          <div className="banner__metric-card">
            <h2>200+</h2>
            <span>International Brands</span>
          </div>
          <div className="banner__metric-card">
            <h2>2,000+</h2>
            <span>High-Quality Products</span>
          </div>
          <div className="banner__metric-card">
            <h2>30,000+</h2>
            <span>Happy Customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;