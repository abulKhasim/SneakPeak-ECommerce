import React from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import "./utils.css";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Follow Us</h4>
        <a href="#abcd">
          <FaTwitter /> Twitter
        </a>
        <a href="#abcd">
          <FaInstagram /> Instagram
        </a>
        <a href="#abcd">
          <FaFacebook /> Facebook
        </a>
        <a href="#abcd">
          <FaYoutube /> Youtube
        </a>

      </div>

      <div className="midFooter" id="aaaa">

        <p>&copy; 2023 SneakPeak, Inc. All Rights Reserved  </p>
      </div>

      <div className="rightFooter">
        <h4>SneakPeak</h4>
          <ul class="foot-content">
            <li><a href="#abcd">Contact Us</a></li>
            <li><a href="#abcd">About Us</a></li>
            <li><a href="#abcd">Shop</a></li>
            <li><a href="#abcd">Feedback</a></li>
          </ul>
      </div>
    </footer>
  );
};

export default Footer;

// eslint-disable-next-line
