import '../../css/checkout-item.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../context/cartcontext';

const CheckoutItem = ({cartItem}) => {
const { name, imageUrl, price, quantity } = cartItem;

const { clearItemFromCart, addItemToCart, removeItemFromCart } =
  useContext(CartContext);

const handleClearItem = () => clearItemFromCart(cartItem);
const handleDecrement = () => removeItemFromCart(cartItem);
const handleIncrement = () => addItemToCart(cartItem);

return (
  <div className="checkout-item-container">
    <div className="image-container">
      <img src={imageUrl} alt={name} />
    </div>
    <span className="name">{name}</span>
    <span className="quantity">
      <div className="arrow" onClick={handleDecrement}>
        &#10094;
      </div>
      <span className="value">{quantity}</span>

      <div className="arrow" onClick={handleIncrement}>
        &#10095;
      </div>
    </span>

    <span className="price">{price}</span>
    <span className="price">
     
      <select name="size" id="size" className='options'>
        <option value="small">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </span>
    <div className="remove-button" onClick={handleClearItem}>
      &#10005;
    </div>
  </div>
);
}
export default CheckoutItem;