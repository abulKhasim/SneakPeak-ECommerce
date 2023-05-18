import React from "react";
import "./aboutSection.css";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <h1 component="h1">About Us</h1>

        <div>
          <p className="para">
            Welcome to our Sneaker Ecommerce Website! We are a team of five
            enthusiastic students who have come together for our final year
            project. Our mission is to create an exceptional online platform
            dedicated to all things sneakers.
          </p>
          <p className="para">
            Our vision is to be more than just another online sneaker retailer.
            We strive to be the go-to destination for sneaker enthusiasts,
            offering a wide range of sneakers that showcase the latest trends,
            exclusive releases, and hard-to-find gems. We carefully curate our
            collection, ensuring that each pair meets our high standards of
            quality and style.
          </p>
          <p className="para">
            We are passionate about providing an exceptional user experience.
            Our website is designed with you in mind, with a user-friendly
            interface, intuitive navigation, and visually appealing aesthetics.
            We want you to enjoy every moment spent browsing our selection and
            easily find the perfect pair of sneakers that speaks to your
            individual style.
          </p>
          <p className="para">
            We love hearing from our customers, so please feel free to reach out
            to us with any questions, feedback, or inquiries. You can contact us
            via email, phone, or through our social media channels. We're here
            to assist you every step of the way.
          </p>
          <h2 className="h22">
            Thank you for choosing our Sneaker Ecommerce Website. Get ready to
            embark on a thrilling sneaker journey with us. Happy shopping!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default About;
