import { useEffect, useState } from "react";
import { signIn, signUp } from "./components/AuthService";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        console.log("Username:", username);
        console.log("Password:", password);
    }, [username, password]);

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
          const session = await signIn(username, password);
          console.log('Sign in successful', session);
          if (session && typeof session.AccessToken !== 'undefined') {
            sessionStorage.setItem('accessToken', session.AccessToken);
            if (sessionStorage.getItem('accessToken')) {
              window.location.href = '/home';
            } else {
              console.error('Session token was not set properly.');
            }
          } else {
            console.error('SignIn session or AccessToken is undefined.');
          }
        } catch (error) {
          alert(`Sign in failed: ${error}`);
        }
      };

      const SignUpHandler = async (e) => {
        e.preventDefault();
        try {
            await signUp(username, password);
            alert('Sign up successful');
          } catch (error) {
            alert(`Sign up failed: ${error}`);
          }
      };

    return (
        <div>
            <h1>LoginPage</h1>
            <form onSubmit={loginHandler}>
                <label htmlFor="username">Username:</label>
                <input type="email" id="username" name="username" onChange={usernameHandler} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={passwordHandler} />
                <button type="submit">Login</button>
            </form>

            <button onClick={SignUpHandler}>SignUp</button>
        </div>
    );
}

export default LoginPage;