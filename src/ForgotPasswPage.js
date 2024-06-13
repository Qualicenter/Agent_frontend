/**
 * @author Aldehil Sánchez
 * This file contains the ForgotPasswPage component that allows the user to recover their password.
 * The user must enter their username, then a code will be sent to their email to reset the password.
 * After entering the code, the user will be able to enter a new password.
 */

import "./styles/login-page.css";
import qualitas_logo from "./images/qualitas-logo.png";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";

const ForgotPasswPage = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [showedField, setShowedField] = useState("username");
  const [showNewPasswFields, setShowNewPasswFields] = useState(false);

  // Function to handle the username input
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  // Function to handle which fields are shown
  // TODO: Implement the logic to show the new password fields
  const forgotPasswHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Forgot password for:", username);
      setShowedField("code");
    } catch (error) {
      alert(`Forgot password failed: ${error}`);
    }
  };

  // Function to handle the code input
  const codeHandler = (e) => {
    setCode(e.target.value);
    console.log("Code:", code);
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
          <h1>Recover your password</h1>
          {showedField === "username" ? (
            <form onSubmit={forgotPasswHandler}>
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
              <button type="submit">Recover password</button>
            </form>
          ) : showedField === "code" ? (
            <form onSubmit={forgotPasswHandler}>
              <div>
                <FaRegUser className="login-icon" />
                <div className="input-container">
                  <input
                    type="text"
                    id="code"
                    name="code"
                    onChange={codeHandler}
                    value={code}
                    required
                  />
                  <label
                    htmlFor="code"
                    className={code.trim() === "" ? "" : "mantain-position"}
                  >
                    Code:
                  </label>
                </div>
              </div>
              <button type="submit">Submit code</button>
            </form>
          ) : (
            <div></div>
          )}
          <p>
            ¿Do you have already an account?
            <br />
            Login <a href="/login">here</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswPage;
