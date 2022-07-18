import "../../css/checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cartcontext";
import CheckoutItem from "../shop/checkout-item";

import PaymentForm from "../../payment-form/payment-form";

const Checkout = () => {
  const { cartItems, cartTotal} =
    useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          {" "}
          <span>Description</span>
        </div>

        <div className="header-block">
          {" "}
          <span>Quantity</span>
        </div>

        <div className="header-block">
          {" "}
          <span>Price</span>
        </div>

        <div className="header-block">
          {" "}
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <span className="total">Total: {cartTotal}</span>
      <PaymentForm/>
    </div>
  );
};
export default Checkout;
