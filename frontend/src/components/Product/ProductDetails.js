import React, { Fragment, useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
// import Product from "../Home/ProductCard";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // const { products } = useSelector((state) => state.products);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { id } = useParams();

  // const options = {
  //   edit: false,
  //   color: "rgba(20,20,20,0.1)",
  //   activeColor: "tomato",
  //   size: window.innerWidth < 600 ? 20 : 25,
  //   value: product.ratings,
  //   isHalf: true,
  // };

  const options = {
    size: "large",
    value: product && product.ratings ? product.ratings : 0,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlide() {
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    showSlide();
  }

  function nextSlide() {
    currentSlide++;
    if (currentSlide === slides.length) {
      currentSlide = 0;
    }
    showSlide();
  }

  showSlide();

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <Fragment>
            <MetaData title={`${product.name} -- SneakPeak`} />
            <div className="ProductDetails">
              <div className="PDImage">
                {/* <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel> */}
                <div className="slider">
                  {product.images && product.images.length > 0 ? (
                    <Fragment>
                      {product.images.map((image, index) => (
                        <div
                          className={`slide ${index === 0 ? "active" : ""}`}
                          key={index}
                        >
                          <img src={image.url} alt={`Image ${index + 1}`} />
                        </div>
                      ))}
                    </Fragment>
                  ) : (
                    <div className="slide">
                      <img src="/placeholder-image.jpg" alt="Placeholder" />
                    </div>
                  )}
                  <a className="prev" onClick={prevSlide}>
                    &#10094;
                  </a>
                  <a className="next" onClick={nextSlide}>
                    &#10095;
                  </a>
                </div>

                {/* <img src={product.images && product.images[0].url} />
              <img src={product.images && product.images[1].url} /> */}
              </div>

              <div>
                <div className="detailsBlock-1">
                  <p>Product # {product._id}</p>
                  <h2>{product.name}</h2>
                </div>
                <div className="detailsBlock-2">
                  <h2 className="detailsBlock-2Price">{`₹${product.price}`}</h2>
                </div>

                <div className="detailsBlock-3">
                  <Rating {...options} />
                  <span className="detailsBlock-2-span">
                    {" "}
                    ({product.numOfReviews} Reviews)
                  </span>

                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <span className="uniqueClassForSpanPad">{quantity}</span>
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button
                      disabled={product.Stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div>
                    <select>
                      <option>Uk 7</option>
                      <option>Uk 8</option>
                      <option>Uk 9</option>
                      <option>Uk 10</option>
                    </select>
                  </div>

                  <p>
                    Status:
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div className="detailsBlock-4">
                  Product Details : <p>{product.description}</p>
                </div>

                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>

            {/* <h3>Shop More</h3> */}

            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}

            {/* <div className="product-container">
              <Product product={product} />
              {products &&
                products.map((product) => <Product product={product} />)}
            </div> */}
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default ProductDetails;
