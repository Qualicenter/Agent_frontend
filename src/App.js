import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./HomePage";
import LoginPage from "./LoginPage";
import ForgotPasswPage from "./ForgotPasswPage";

function App() {
  const hasAccessToken = () => {
    const token = sessionStorage.getItem("accessToken");
    return true;
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
