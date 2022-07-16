import "../../css/dropdown.styles.scss";
import Button from "../button";
import CartItem from "./cart-item";
import { useContext } from "react";
import { CartContext } from "../../context/cartcontext";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate()

  const goToCheckoutFunc = () =>{
    navigate('/checkout')
  }


  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button buttonType="inverted" onClick={goToCheckoutFunc}>Checkout</Button>
    </div>
  );
};
export default CartDropdown;
