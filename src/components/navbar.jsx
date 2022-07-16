import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as Crownlogo } from "../crown.svg";
import "../css/navbar.scss";

import { UserContext } from "../context/usercontex";
import { CartContext } from "../context/cartcontext";


import { signOutUser } from "../firebase/firebase";
import CartIcon from "./shop/cart-icon";
import CartDropdown from "./shop/cartdropdown";


function NavBar() {
  const { currUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)
  // console.log(currUser);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Crownlogo className="logo" />
        </Link>
        <div className="navlinkscontainer">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/signin">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown/>}
      </div>

      <Outlet />
    </Fragment>
  );
}

export default NavBar;
