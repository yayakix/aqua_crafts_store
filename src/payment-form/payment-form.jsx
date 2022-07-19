import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../components/button";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

import { useEffect, useState } from "react";
import { CartContext } from "../context/cartcontext";
import { UserContext } from "../context/usercontex";
import { useContext } from "react";

const PaymentForm = () => {
  const { cartTotal, cartItems } = useContext(CartContext);
  console.log(cartItems)
  const [amount, setAmount] = useState(cartTotal);

  useEffect(() => {
    setAmount(cartTotal);
  }, [cartTotal]);

  const { currUser } = useContext(UserContext);
//   console.log(currUser);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;
    // console.log(clientSecret);

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currUser ? currUser.displayName : "guest",
          email: currUser ? currUser.email : "guest",
        },
      },
    });

    setPaymentLoading(false);

    if (paymentResult.error) {
      alert("error" + paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment successful");
      }
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2> Credit Card Payment</h2>
        <CardElement className="paymentcardelement" />

        <Button buttonType="inverted">Pay Now</Button>
        {paymentLoading ? <h2>Your payment is being processed</h2> : null}
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
