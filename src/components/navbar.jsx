import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as Aqualogo } from "../assets/aquavector.svg";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
NavLink} from "../css/navbar.styles.jsx";

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
      <NavigationContainer>
        <LogoContainer to="/">
          <Aqualogo className="aqualogo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink  to="/shop">
            SHOP
          </NavLink>
          {currUser ? (
            <span  onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <NavLink to="/signin">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
}

export default NavBar;
