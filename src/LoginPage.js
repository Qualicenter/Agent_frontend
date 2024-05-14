import { useEffect, useState } from "react";
import { signIn } from "./components/AuthService";
import "./styles/login-page.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import qualitas_logo from "./images/qualitas-logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    console.log("Username:", username);
    console.log("Password:", password);
  }, [username, password]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const session = await signIn(username, password);
      console.log("Sign in successful", session);
      if (session && typeof session.AccessToken !== "undefined") {
        sessionStorage.setItem("accessToken", session.AccessToken);
        if (sessionStorage.getItem("accessToken")) {
          window.location.href = "/home";
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
          <h1>Inicio de Sesión</h1>
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
            ¿Olvidaste tu contraseña?
            <br />
            Haz click <a href="/forgot-passw">aquí</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
