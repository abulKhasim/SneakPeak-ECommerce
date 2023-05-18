import React, { Fragment, useEffect } from "react";
import "./Home.css";
import "./utils.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Jordan from "../../images/jordan.png"
import { FaLock, FaShuttleVan } from 'react-icons/fa';


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"SneakPeak"} />

          <header className="hero-container header-section flex">
            <div className="heading">
              <p>Classic Store</p>
              <h1 className="h1-tag">
                Step up Your Style With the Latest Sneaker Collection !
              </h1>
              <a href="#container" className="shop-now-btn">
                Shop Now
              </a>
            </div>
            <div className="image-section">
              <img src={Jordan} alt="hero"></img>
            </div>
          </header>

          <div className="strip flex">
            <div className="stip-content">
              <FaLock/>
              <span>Secure Environment</span>
            </div>

            <div className="stip-content">
              <FaShuttleVan/>
              <span>Free Delivery</span>
            </div>

            <div className="stip-content">
              {/* <BsArrowCounterclockwise/> */}
              <span>Easy Returns</span>
            </div>

            <div className="stip-content">
              <FaLock/>
              <span>Secure Payment</span>
            </div>
          </div>

          <div className="home-heading" id="container">
            <h2>New Arrivals</h2>
            <p>New Season, New Arrivals, New For You!</p>
          </div>

          <div className="product-container">
            {/* <Product product={product} /> */}
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>

          <div className="button-container">
            <Link to={"/products"}>
              <button className="exploreMClass">Explore More</button>
            </Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
