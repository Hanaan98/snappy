import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import UserContext from "./state/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
function App() {
  const Ctx = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            !Ctx.isAuthenticated ? <Navigate to="/login" replace /> : <Chat />
          }
        />
        <Route
          path="*"
          element={
            !Ctx.isAuthenticated ? <Navigate to="/login" replace /> : <Chat />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
