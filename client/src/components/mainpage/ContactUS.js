import React from 'react';
import "./Contact.css"
const ContactUS = () => {
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p className="apology-message">
        <strong>We apologize for the inconvenience.</strong> Our payment gateway will be available soon. Thank you for your patience!
      </p>
      <div className="contact-info">
        <p>
          <strong>Email:</strong> 
          <a href="mailto:sreefoodproducts.sfp@gmail.com"> sreefoodproducts.sfp@gmail.com</a>
        </p>
        <p>
          <strong>Phone:</strong> 
          <a href="tel:9449248417"> 9449248417</a>
        </p>
        <p>
          <strong> <a href="https://www.instagram.com/sreefoodproducts.sfp/">Instagram</a></strong> 
          
        </p>
      </div>
    </div>
  );
};

export default ContactUS;
