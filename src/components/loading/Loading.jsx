import React from "react";
import "./Loading.scss";

const Loading = ({ count }) => {
  const rows = Array.from({ length: Math.ceil(count / 4) });

  return (
    <div className="loading-container container">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="loading-row">
          {Array.from({ length: 4 }).map((_, cardIndex) => (
            <div key={cardIndex} className="loading-card">
              <div className="loading-img skeleton"></div>
              <div className="loading-title skeleton"></div>
              <div className="loading-price skeleton"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Loading;
