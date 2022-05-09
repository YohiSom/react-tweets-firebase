import React, { useRef, useState, useEffect } from "react";
import { auth, provider } from "../../firebase-config";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigateHome = useNavigate();
  const emailRef = useRef(null);
  const passWordRef = useRef(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [singUp, setSignUp] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigateHome("/");
    });
  };

  const signUpwithEmail = (name) => {
    // e.preventDefault();
    setError("");
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passWordRef.current.value
    )
      .then((user) => {
        setSignUp("Sign up is successful, please sign in")
        // navigateHome("/");
      })

      .catch((error) => {
        setError(
          "Please verify that email is correct and password contains at least 6 characters"
        );
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  const signInwithEmail = () => {
    setError("");
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passWordRef.current.value
    )
      .then((user) => {
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        navigateHome("/");
      })

      .catch((error) => {
        setError("email or password incorrect");
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      res ? setUser(res) : setUser(null);
      setError("");
    });
    return unsubscribe;
  }, []);

  return (
    <div className="login-container">
      <div className="login-card">
        <p className="ggl-sign">Sign in with Google</p>
        <button className="ggl-btn" onClick={signInWithGoogle}>
          Google
        </button>
      </div>
      <p className="email-title">Sign in with Email</p>
      <div className="email-signin">
        <input type="email" placeholder="email" ref={emailRef}></input>
        <input type="password" placeholder="password" ref={passWordRef}></input>
        <button onClick={signInwithEmail}>Sign In</button>
        <p className="sign-up">
          Not yet registered?{" "}
          <span className="btn-sign-up" onClick={signUpwithEmail}>
            Sign Up
          </span>
        </p>
        <div> {error && <p className="error-sign">{error}</p>}</div>
        <div> {singUp && <p className="signup">{singUp}</p>} </div>
      </div>
    </div>
  );
}

export default Login;
