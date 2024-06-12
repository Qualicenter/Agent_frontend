import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./HomePage";
import LoginPage from "./LoginPage";
import ForgotPasswPage from "./ForgotPasswPage";

function App() {
  /**
   * Function to check if the user has an access token.
   * returns true if the user has an access token, false otherwise.
   * 
   * Note: To increase security, this validation could be donde with jwt validation.
   */
  const hasAccessToken = () => {
    const token = sessionStorage.getItem("accessToken");
    return !!token;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            hasAccessToken() ? (
              <Navigate replace to="/home" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/home" element={
            hasAccessToken() ? (
                <HomePage/>
              ) : (
                <Navigate replace to="/login" />
              )
        } />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/forgot-passw" element={<ForgotPasswPage/>} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
