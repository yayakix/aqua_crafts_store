import styled from "styled-components";
import { Link } from "react-router-dom";


export const NavigationContainer = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: white;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 90px;
`;

export const NavLinksContainer = styled.div`
width: 50%;
height: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

