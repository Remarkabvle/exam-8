import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaCcVisa } from "react-icons/fa";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top container">
        <h1>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
        <form>
          <div className="email-input-group">
            <button>
              <MdOutlineEmail />
            </button>
            <input placeholder="Enter your email address" type="text" />
          </div>
          <button className="newsletter-button">Subscribe to Newsletter</button>
        </form>
      </div>
      <div className="footer-bottom container">
        <div className="footer-info">
          <ul>
            <div className="footer-brand">Shop.co</div>
            <p>
              We have clothes that suit your style and make you proud to wear.
              From women to men.
            </p>
            <div className="social-media-links">
              <a target="_blank" href="https://twitter.com">
                <FaTwitter />
              </a>
              <a target="_blank" href="https://facebook.com">
                <FaFacebookF />
              </a>
              <a target="_blank" href="https://instagram.com">
                <FaInstagram />
              </a>
              <a target="_blank" href="https://github.com">
                <FaGithub />
              </a>
            </div>
          </ul>
          <ul>
            <h4>Quick Links</h4>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </li>
          </ul>
          <ul>
            <h4>Customer Support</h4>
            <li>
              <Link to="/track-order">Track My Order</Link>
            </li>
            <li>
              <Link to="/payment-methods">Payment Methods</Link>
            </li>
            <li>
              <Link to="/support">Customer Service</Link>
            </li>
            <li>
              <Link to="/returns">Return & Exchanges</Link>
            </li>
          </ul>
          <ul>
            <h4>Our Partners</h4>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/press">Press & Media</Link>
            </li>
            <li>
              <Link to="/blog">Shop Blog</Link>
            </li>
          </ul>
        </div>
        <div className="footer-credits">
          <p>© Shop.co All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
