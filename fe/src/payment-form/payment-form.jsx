import React, { useState, useContext } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import "./paymentform.css";
import { CartContext } from "../context/cartcontext";

const publishableKey = process.env.REACT_APP_API_STRIPE_PUBLIC_KEY;
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, cartTotal } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    let response = await fetch(
      "http://localhost:3001/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      }
    );

    const session = await response.json();
    console.log("session", session);
    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error(error);
      alert("An error occurred during checkout.");
    }

    // // Create payment method using card element
    // const { error, paymentMethod } = await stripe.checkout.sessions.create({
    //   success_url: "http://localhost:3000/success",
    //   type: "card",
    //   card: elements.getElement(CardElement),
    //   billing_details: {
    //     name: formData.name,
    //     email: formData.email,
    //     address: {
    //       line1: formData.address,
    //       city: formData.city,
    //       state: formData.state,
    //       postal_code: formData.zip,
    //     },
    //   },
    // });

    // if (error) {
    //   console.error(error);
    //   alert("Payment failed: " + error.message);
    //   return;
    // }

    // Rename this second response to avoid redeclaration
    const paymentResponse = await fetch(
      "http://localhost:3001/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
        }),
      }
    );
    console.log("paymentResponse", paymentResponse);
    const result = await paymentResponse.json();

    if (result.error) {
      alert("Payment failed: " + result.error);
    } else {
      alert("Payment successful!");
      // Handle success (redirect, clear cart, etc.)
    }
  };

  return (
    <div className="paymentform">
      <h2>Pay with Stripe</h2>
      <hr />
      <section>
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address Information */}
          <div className="form-row">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>

          {/* Card Information */}
          <div className="form-row">
            <label>Card Details</label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    padding: "16px",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                },
                hidePostalCode: false, // Since we collect it above
              }}
            />
          </div>

          <button type="submit">Pay with Stripe ${cartTotal}</button>
        </form>
      </section>
    </div>
  );
};

export default PaymentForm;
