import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import "./paymentform.css";

const publishableKey = process.env.REACT_APP_API_STRIPE_PUBLIC_KEY;
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

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
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1O655vCJ5eZRf2eC65555555",
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
      customerEmail: formData.email,
    });

    if (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="paymentform">
      <h2> Pay with Stripe </h2>
      <hr />
      <stripe-buy-button
        buy-button-id="buy_btn_1PsoSnCqCjfV1TUoFfsMLuzI"
        publishable-key={publishableKey}
      ></stripe-buy-button>
    </div>
  );
};

export default PaymentForm;
