import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/header/Navbar";
import Footer from "./components/layout/footer/Footer.js";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/updatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
// import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
// import ProtectedRoute from "./components/Route/ProtectedRoute";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UserList from "./components/Admin/UserList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    // WebFont.load({
    //   google: {
    //     families: ["Roboto", "Droid Sans", "Chilanka"],
    //   },
    // });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Navbar />
      {isAuthenticated && <UserOptions user={user} />};
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          {isAuthenticated && (
            <Routes>
              <Route path="/process/payment" element={<Payment />} />
            </Routes>
          )}
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {isAuthenticated && <Route path="/account" element={<Profile />} />}
        {isAuthenticated && (
          <Route path="/me/update" element={<UpdateProfile />} />
        )}
        {isAuthenticated && (
          <Route path="/password/update" element={<UpdatePassword />} />
        )}

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/login" element={<LoginSignUp />} />

        <Route path="/cart" element={<Cart />} />

        {isAuthenticated && (
          <Route path="/login/shipping" element={<Shipping />} />
        )}

        {isAuthenticated && (
          <Route path="/success" element={<OrderSuccess />} />
        )}
        {isAuthenticated && <Route path="/orders" element={<MyOrders />} />}

        {isAuthenticated && (
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        )}
        {/* {isAuthenticated && (
          <Route path="/order/:id" element={<OrderDetails />} />
        )} */}

        {/* change in url */}
        {isAuthenticated && (
          <Route path="/admin/dashboard" element={<Dashboard />} />
        )}

        {isAuthenticated && (
          <Route path="/admin/products" element={<ProductList />} />
        )}

        {isAuthenticated && (
          <Route path="/admin/product" element={<NewProduct />} />
        )}

        {isAuthenticated && (
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        )}

        {isAuthenticated && (
          <Route path="/admin/orders" element={<OrderList />} />
        )}

        {isAuthenticated && (
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        )}

        {isAuthenticated && (
          <Route path="/admin/users" element={<UserList />} />
        )}

        {isAuthenticated && (
          <Route path="/admin/user/:id" element={<UpdateUser />} />
        )}

        {isAuthenticated && (
          <Route path="/admin/reviews" element={<ProductReviews />} />
        )}

        <Route
          element={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
