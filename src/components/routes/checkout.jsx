import "../../css/checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cartcontext";
import CheckoutItem from "../shop/checkout-item";
import { useState, useEffect } from "react";

import PaymentForm from "../../payment-form/payment-form";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust this value as needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>{isSmallScreen ? "Item" : "Product"}</span>
        </div>
        <div className="header-block">
          {" "}
          <span>{isSmallScreen ? "Desc" : "Description"}</span>
        </div>

        <div className="header-block">
          {" "}
          <span>{isSmallScreen ? "#" : "Quantity"}</span>
        </div>

        <div className="header-block">
          {" "}
          <span>{isSmallScreen ? "$" : "Price"}</span>
        </div>
        <div className="header-block">
          {" "}
          <span>Size</span>
        </div>
        <div className="header-block">
          {" "}
          <span>{isSmallScreen ? "Del" : "Remove"}</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <span className="total">Total: ${cartTotal}</span>
      <PaymentForm />
    </div>
  );
};
export default Checkout;
