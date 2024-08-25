import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ searchResults, searchValue, handleClose }) => {
  return (
    <div>
      {searchValue.trim() ? (
        <div className="search__results">
          <ul>
            {searchResults?.payload?.map((product) => (
              <Link
                to={`/product/${product._id}`}
                onClick={handleClose}
                key={product._id}
              >
                <img src={product.urls[0]} alt="" />
                <p>{product.title}</p>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchResults;
