import { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Home from "./home";
import Register from "./register";
import Login from "./login";
import Todo from "./todo";
import { AuthContext } from "./context/Authcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/todo-page"
            element={
              <RequireAuth>
                <Todo />
              </RequireAuth>
            }
          />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
