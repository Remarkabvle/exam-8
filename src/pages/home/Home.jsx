import React from "react";
import "./home.scss";
import { useGetProductsQuery } from "../../context/api/productApi";
import { useGetCommentsQuery } from "../../context/api/commentApi.js";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import heroImage from "../../assets/hero.jpg";
import vectorGraphic from "../../assets/vector.svg";
import brandVersace from "../../assets/versace.svg";
import brandGucci from "../../assets/gucci.svg";
import brandPrada from "../../assets/prada.svg";
import brandZara from "../../assets/zara.svg";
import brandCalvin from "../../assets/calvin.svg";
import Products from "../../components/products/Products";
import stylesData from "./style.js";
import checkIcon from "../../assets/check.svg";
import ratingStar from "../../assets/star.svg";
import halfRatingStar from "../../assets/halfStar.svg";
import emptyStar from "../../assets/starRegular.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Hero from "../../components/hero/Hero.jsx";
import HappyCustomers from "../../components/HappyCustomers/HappyCustomers.JSX";

const HomeRefactored = () => {
  const { data: commentsData } = useGetCommentsQuery();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.trunc(rating); i++) {
      stars.push(
        <img src={ratingStar} alt="full star" key={`star-full-${i}`} />
      );
    }
    if (rating % 1 > 0.4) {
      stars.push(
        <img src={halfRatingStar} alt="half star" key={`star-half`} />
      );
    }
    for (let i = Math.round(rating); i < 5; i++) {
      stars.push(
        <img src={emptyStar} alt="empty star" key={`star-empty-${i}`} />
      );
    }
    return stars;
  };

  return (
    <main className="home">
      <Hero />
      <section className="brand-carousel">
        <div className="brand-carousel__container">
          <img
            src={brandVersace}
            alt="Versace"
            className="brand-carousel__logo"
          />
          <img src={brandZara} alt="Zara" className="brand-carousel__logo" />
          <img src={brandGucci} alt="Gucci" className="brand-carousel__logo" />
          <img src={brandPrada} alt="Prada" className="brand-carousel__logo" />
          <img
            src={brandCalvin}
            alt="Calvin Klein"
            className="brand-carousel__logo"
          />
        </div>
      </section>

      <section className="home-products">
        <h2>Latest Arrivals</h2>
        <Products />
        <hr />
        <h2>Best Sellers</h2>
        <Products />
      </section>
      <section className="fashion-container container">
        <h2>Shop by Style</h2>
        <div className="fashion-cards">
          {stylesData.map((style) => (
            <div className="fashion-card" key={style.id}>
              <img src={style.img} alt={style.title} />
              <h3>{style.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <HappyCustomers/>
    </main>
  );
};

export default HomeRefactored;
