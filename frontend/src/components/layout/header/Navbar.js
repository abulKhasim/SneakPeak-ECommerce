import React from "react";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./navbar.css";
import "./utils.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <section id="header">
        <a href="/" className="sneakpeak">
          SneakPeak
        </a>

        <div>
          <ul id="navbar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Shop</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul id="navbar">
            <li>
              <Link to="/search">
                <FaSearch />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <FaShoppingCart />
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FaUserCircle />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
