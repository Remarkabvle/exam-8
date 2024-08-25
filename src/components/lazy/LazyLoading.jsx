import React, { memo } from "react";
import { FaSpinner } from "react-icons/fa";
import "./LazyLoading.scss";

const LazyLoading = () => (
  <div className="lazy-loading">
    <FaSpinner className="lazy-loading__spinner" />
  </div>
);

export default memo(LazyLoading);
