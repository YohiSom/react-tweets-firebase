import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import {TweetsContext} from "../App";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isAuth, setIsAuth } = React.useContext(TweetsContext);
  let navigateLogin = useNavigate()
  const signUserOut = () => {
    
    signOut(auth).then(() => {
    localStorage.clear();
      setIsAuth(false);
      navigateLogin = "/login";
    });
  };

  return (
    <Nav>
      <NavMenu>
        {!isAuth ? (
          <NavLink to="/login" activestyle="true">
            Login{" "}
          </NavLink>
        ) : (
          <>
            <NavLink to="/" activestyle="true">
              Home{" "}
            </NavLink>
            <NavLink to="/profile" activestyle="true">
              Profile{" "}
            </NavLink>
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </NavMenu>{" "}
    </Nav>
  );
}

export default Navbar;
