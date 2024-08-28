import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import Button from "../components/button";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

import { useEffect, useState } from "react";
import { CartContext } from "../context/cartcontext";
import { UserContext } from "../context/usercontex";
import { useContext } from "react";

const PaymentForm = () => {
  const { cartTotal, cartItems } = useContext(CartContext);
  const [stringCartItems, setstringCartItems] = useState(cartItems);
  // console.log(cartItems)
  const [amount, setAmount] = useState(cartTotal);

  useEffect(() => {
    setAmount(cartTotal);
  }, [cartTotal]);

  const { currUser } = useContext(UserContext);
  //   console.log(currUser);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setstringCartItems(JSON.stringify(cartItems));
    //  console.log("cart items" + stringCartItems);
  }, [cartItems]);

  // handle form input
  const [useraddress, setAddress] = useState("");

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);

    const reply = {
      amount: amount * 100,
      description: stringCartItems,
    };

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reply),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;
    // console.log(clientSecret);

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(PaymentElement),
        billing_details: {
          name: currUser ? currUser.displayName : "guest",
          email: currUser ? currUser.email : "guest",
          address: {
            line1: useraddress,
          },
        },
      },
    });
    console.log(paymentResult);

    setPaymentLoading(false);

    if (paymentResult.error) {
      alert("error" + paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment successful");
      }
    }
  };
  // return (
  //   <Elements stripe={stripePromise}>
  //     <PaymentFormContainer />
  //   </Elements>
  // );
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <div className="shippinginfo">
          <h2> Shipping address </h2>
          <hr />
          <input
            type="text"
            value={useraddress}
            placeholder="shipping address"
            onChange={handleChange}
            required
            className="addressbox"
          />
        </div>

        <h2 className="payment-title"> Credit Card Payment</h2>
        <hr />
        <PaymentElement options={{ layout: "tabs" }} />

        <Button buttonType="inverted">Pay Now</Button>
        {paymentLoading ? <h2>Your payment is being processed</h2> : null}
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
