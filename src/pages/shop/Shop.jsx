import React, { useState } from "react";
import './shop.scss'; // Adjust the path as needed
import { useGetProductsQuery } from "../../context/api/productApi";
import { Link } from "react-router-dom"; // Import Link for navigation
import Loading from "../../components/loading/Loading";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Set the number of products per page

  const { data: productList, isLoading, isFetching } = useGetProductsQuery();

  if (isLoading || isFetching) {
    return <Loading count={12} />;
  }

  // Calculate the indexes for the current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList?.payload?.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productList?.payload?.length / productsPerPage);

  // Function to handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="shop-container container">
      <h1 className="shop-title">Shop</h1>
      <div className="products-container">
        {currentProducts?.map((product) => (
          <div key={product._id} className="product-card">
            <div className="card-header">
              {/* Product Actions like Add to Cart, Wishlist, etc. */}
            </div>
            <Link to={`/product/${product._id}`}>
              <img src={product.urls[0]} alt="product-img" className="product-image" />
            </Link>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <div className="price-section">
                <h2 className="current-price">${product.price}</h2>
                {product.oldPrice && product.price < product.oldPrice && (
                  <>
                    <h2 className="old-price">${product.oldPrice}</h2>
                    <span className="discount-percentage">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber + 1}
            onClick={() => paginate(pageNumber + 1)}
            className={`page-number ${currentPage === pageNumber + 1 ? "active" : ""}`}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shop;
