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

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const forgotPasswHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Forgot password for:", username);
      setShowedField("code");
    } catch (error) {
      alert(`Forgot password failed: ${error}`);
    }
  }

  const codeHandler = (e) => {
    setCode(e.target.value);
    console.log("Code:", code);
  }

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
          <h1>Recuperar su contraseña</h1>
          {showedField === "username" ? <form onSubmit={forgotPasswHandler}>
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
            <button type="submit">Recuperar contraseña</button>
          </form> : showedField === "code" ? <form onSubmit={forgotPasswHandler}>
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
            <button type="submit">Recuperar contraseña</button>
          </form> : <div></div>}
          <p>
            ¿Ya tienes cuenta?
            <br />
            Iniciar sesión <a href="/login">aquí</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswPage;
