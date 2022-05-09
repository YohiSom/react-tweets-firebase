import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #15202b;
  height: 58px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px; 
  z-index: 10;
  position: fixed;
  overflow: hidden;
  top: 0;
  width: 1930px;
  
`;

export const NavLink = styled(Link)`

color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
color: #FFFFFF;

}

`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  background: #343A40;
  width: 80%;
  margin-right: 74px;
  border-radius: 8px;
  padding-left: 35px;
`;
