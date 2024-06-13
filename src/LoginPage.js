/**
 * @author Aldehil Sánchez
 * This file contains the LoginPage component that allows the user to log in.
 */

import { useState } from "react";
import { signIn } from "./components/AuthService";
import "./styles/login-page.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import qualitas_logo from "./images/qualitas-logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the username input
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  // Function to handle the password input
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle the login when the form is submitted
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      // Call the signIn function to authenticate the user
      const session = await signIn(username, password);
      // If the session is valid, store the access token in the session storage
      if (session && typeof session.AccessToken !== "undefined") {
        sessionStorage.setItem("accessToken", session.AccessToken);
        if (sessionStorage.getItem("accessToken")) {
          window.location.href = "/home"; // Redirect to the home page if the login is successful
        } else {
          console.error("Session token was not set properly.");
        }
      } else {
        console.error("SignIn session or AccessToken is undefined.");
      }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }
  };

  return (
    <div className="background">
      <div className="login-container">
        <div className="left-login-image"></div>
        <div className="right-login">
          <img
            src={qualitas_logo}
            alt="Qualitas logo"
            className="qualitas-logo"
          />
          <h1>Login</h1>
          <form onSubmit={loginHandler}>
            <div>
              <FaRegUser className="login-icon" />
              <div className="input-container">
                <input
                  type="email"
                  id="username"
                  name="username"
                  onChange={usernameHandler}
                  required
                />
                <label
                  htmlFor="username"
                  className={username.trim() === "" ? "" : "mantain-position"}
                >
                  Username:
                </label>
              </div>
            </div>
            <div>
              <MdOutlinePassword className="login-icon" />
              <div className="input-container">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={passwordHandler}
                  required
                />
                <label
                  htmlFor="password"
                  className={password.trim() === "" ? "" : "mantain-position"}
                >
                  Password:
                </label>
              </div>
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            ¿Did you forget your password?
            <br />
            Click <a href="/forgot-passw">here</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
