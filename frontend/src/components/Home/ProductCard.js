import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link id="product1" class="padding-20" to={`/product/${product._id}`}>
      <div>
        <div class="pro">
          <img src={product.images[0].url} alt={product.name} />
          <div class="des">
            {/* <span>Jordan</span> */}
            <h5>{product.name}</h5>
            <div>
              <ReactStars {...options} />{" "}
              <span> ({product.numOfReviews} Reviews) </span>
            </div>
            <h4>{`₹${product.price}`}</h4>
          </div>
          <Link to={"/cart"} className="cart">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
