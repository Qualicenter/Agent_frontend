import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./HomePage";
import LoginPage from "./LoginPage";

function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
