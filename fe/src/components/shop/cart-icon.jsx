import "../../css/carticon.styles.scss";
import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../../context/cartcontext";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const toggleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Inline styles for animation
  const animationStyle = {
    animation: animate ? "scaleCount 0.3s ease" : "none",
  };

  // Keyframes for the animation
  const keyframes = `
    @keyframes scaleCount {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;

  return (
    <div className="cart-icon-container" onClick={toggleCartOpen}>
      <style>{keyframes}</style>
      <ShoppingCartIcon className="shopping-icon" />
      <span className="item-count" style={animationStyle}>
        {cartCount}
      </span>
    </div>
  );
};

export default CartIcon;
