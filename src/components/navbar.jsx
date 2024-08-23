import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext, useCallback } from "react";
import { ReactComponent as Aqualogo } from "../assets/aquavector.svg";
import { useState, useEffect } from "react";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "../css/navbar.styles.jsx";

import { UserContext } from "../context/usercontex";
import { CartContext } from "../context/cartcontext";

import { signOutUser } from "../firebase/firebase";
import CartIcon from "./shop/cart-icon";
import CartDropdown from "./shop/cartdropdown";

function NavBar() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  // console.log(currUser);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 500); // Adjust this value as needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOutUser();
    setCurrUser(null);
  }, [setCurrUser]);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          {isSmallScreen ? "" : <Aqualogo className="aqualogo" />}
        </LogoContainer>
        <NavLinksContainer>
          <CartIcon className="carticon" />
          <NavLink to="/checkout">CHECKOUT</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          {currUser ? (
            <NavLink as="span" onClick={handleSignOut}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/signin">SIGN IN</NavLink>
          )}
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
}

export default NavBar;
