  import React, { useEffect, useState } from "react";
  import "./details.scss";
  import { useParams } from "react-router-dom";
  import { useGetProductByIdQuery } from "../../context/api/productApi";
  import star from "../../assets/star.svg";
  import halfStar from "../../assets/halfStar.svg";
  import starRegular from "../../assets/starRegular.svg";
  import { FaHeart, FaRegHeart } from "react-icons/fa";
  import { useDispatch, useSelector } from "react-redux";
  import {
    add,
    decreaseAmount,
    increaseAmount,
    remove,
  } from "../../context/slices/cartSlice";
  import { toggleHeart } from "../../context/slices/wishlistSlice";
  import Products from "../../components/products/Products";
  // import CommentsTab from "./CommentsTab";
  // import ProductDetails from "./ProductDetails";

  const Detail = () => {
    let { id } = useParams();
    let { data } = useGetProductByIdQuery(id);
    let [mainImg, setMainImg] = useState(0);
    let [isActive, setIsActive] = useState(0);
    let singleData = data?.payload;
    let [abTab, setAbTab] = useState(1);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [id]);

    const getRating = (rating) => {
      let res = [];
      for (let i = 0; i < Math.trunc(rating); i++) {
        res.push(<img src={star} alt="" key={`full-${i}`} />);
      }
      if (rating % 1 > 0.4) {
        res.push(<img src={halfStar} alt="" key={`half`} />);
      }
      for (let i = Math.round(rating); i < 5; i++) {
        res.push(<img src={starRegular} alt="" key={`empty-${i}`} />);
      }
      return res;
    };

    const cartData = useSelector((state) => state.cart.value);
    const selectedData = cartData.find((product) => product._id == id);

    const dispatch = useDispatch();
    const wishlistData = useSelector((state) => state.wishlist.value);
    const isInWishlist = wishlistData.some((el) => el?._id == singleData?._id);

    return (
      <div className="details container">
        <div className="details__top">
          <div className="details__top__left">
            <div className="small__images">
              {singleData?.urls?.map((img, i) => (
                <img
                  key={i}
                  onClick={() => setMainImg(i)}
                  src={img}
                  alt="images"
                  className={mainImg === i ? "active" : ""}
                />
              ))}
            </div>
            <div className="main__image">
              <img src={singleData?.urls[mainImg]} alt="image" />
            </div>
          </div>
          <div className="details__top__right">
            <h1 className="details__title">{singleData?.title}</h1>
            <div className="rating">
              <div className="stars">{getRating(singleData?.rating)}</div>
              <p>({singleData?.rating})</p>
            </div>
            <div className="price">
              <h2>${singleData?.price}</h2>
              {singleData?.price < singleData?.oldPrice && (
                <>
                  <h2 className="oldPrice">${singleData?.oldPrice}</h2>
                  <span>
                    <p>
                      -
                      {Math.round(
                        ((singleData?.oldPrice - singleData?.price) /
                          singleData?.oldPrice) *
                          100
                      )}
                      %
                    </p>
                  </span>
                </>
              )}
            </div>
            <p className="details__description">{singleData?.description}</p>
            <div className="colors">
              <p>Select Colors</p>
              <div className="colors__body">
                <span style={{ backgroundColor: "#4d4630" }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5306 5.03063L6.5306 13.0306C6.46092 13.1005 6.37813 13.156 6.28696 13.1939C6.1958 13.2317 6.09806 13.2512 5.99935 13.2512C5.90064 13.2512 5.8029 13.2317 5.71173 13.1939C5.62057 13.156 5.53778 13.1005 5.4681 13.0306L1.9681 9.53063C1.89833 9.46087 1.84299 9.37804 1.80524 9.28689C1.76748 9.19574 1.74805 9.09804 1.74805 8.99938C1.74805 8.90072 1.76748 8.80302 1.80524 8.71187C1.84299 8.62072 1.89833 8.53789 1.9681 8.46813C2.03786 8.39837 2.12069 8.34302 2.21184 8.30527C2.30299 8.26751 2.40069 8.24808 2.49935 8.24808C2.59801 8.24808 2.69571 8.26751 2.78686 8.30527C2.87801 8.34302 2.96083 8.39837 3.0306 8.46813L5.99997 11.4375L13.4693 3.96938C13.6102 3.82848 13.8013 3.74933 14.0006 3.74933C14.1999 3.74933 14.391 3.82848 14.5318 3.96938C14.6727 4.11028 14.7519 4.30137 14.7519 4.50063C14.7519 4.69989 14.6727 4.89098 14.5318 5.03188L14.5306 5.03063Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span style={{ backgroundColor: "#314F4A" }}></span>
                <span style={{ backgroundColor: "#31344F" }}></span>
              </div>
            </div>
            <div className="sizes">
              <p>Choose Sizes</p>
              <div className="sizes__body">
                <span
                  onClick={() => setIsActive(0)}
                  className={isActive === 0 ? "active" : ""}
                >
                  Small
                </span>
                <span
                  onClick={() => setIsActive(1)}
                  className={isActive === 1 ? "active" : ""}
                >
                  Medium
                </span>
                <span
                  onClick={() => setIsActive(2)}
                  className={isActive === 2 ? "active" : ""}
                >
                  Large
                </span>
                <span
                  onClick={() => setIsActive(3)}
                  className={isActive === 3 ? "active" : ""}
                >
                  X-Large
                </span>
              </div>
            </div>
            <div className="details__buttons">
              <button
                onClick={() => dispatch(toggleHeart(singleData))}
                className={"single__wishlist-btn"}
                style={{
                  borderColor: isInWishlist ? "crimson" : "black",
                }}
              >
                {isInWishlist ? <FaHeart color="crimson" /> : <FaRegHeart />}
              </button>
              <div style={{ flexWrap: "wrap" }} className="cart-btn">
                {selectedData ? (
                  <div className="counter-btns">
                    {selectedData.amount === 1 ? (
                      <button onClick={() => dispatch(remove(selectedData))}>
                        -
                      </button>
                    ) : (
                      <button
                        onClick={() => dispatch(decreaseAmount(selectedData))}
                      >
                        -
                      </button>
                    )}
                    <span>{selectedData.amount}</span>
                    <button
                      onClick={() => dispatch(increaseAmount(selectedData))}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => dispatch(add(singleData))}
                    className="single__add-to-cart-btn"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="details__comments">
          
        </div>
        <div className="details__products">
          <h2>You might also like</h2>
          <Products />
        </div>
      </div>
    );
  };

  export default Detail;
