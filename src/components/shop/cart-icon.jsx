import '../../css/carticon.styles.scss'
import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg'
import { useContext } from 'react'

import { CartContext } from '../../context/cartcontext'

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)
    const toggleCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }
    return (
      <div className="cart-icon-container" onClick={toggleCartOpen}>
        <ShoppingCartIcon className="shopping-icon" />
        <span className="item-count">{cartCount}</span>
      </div>
    );

}

export default CartIcon