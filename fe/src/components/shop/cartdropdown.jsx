import {
  CartDropContainer,
  CartItems,
  EmptyMessage,
} from "../../css/dropdown.styles.jsx";
import Button from "../button.jsx";
import CartItem from "./cart-item.jsx";
import { useContext } from "react";
import { CartContext } from "../../context/cartcontext.jsx";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutFunc = () => {
    setIsCartOpen(!isCartOpen);
    navigate("/checkout");
  };

  return (
    <CartDropContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button buttonType="inverted" onClick={goToCheckoutFunc}>
        Checkout
      </Button>
    </CartDropContainer>
  );
};
export default CartDropdown;
