import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TodoPage from "./components/TodoPage";
import TodoDetails from "./components/TodoDetails";
import UpdateTodo from "./components/UpdateTodo";
import CreateTodo from "./components/CreateTodo";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route
          exact
          path="/:email/reset-password"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/home"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/details/:todoId"
          element={
            <PrivateRoute>
              <TodoDetails />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/details/:todoId/update"
          element={
            <PrivateRoute>
              <UpdateTodo />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/home/create"
          element={
            <PrivateRoute>
              <CreateTodo />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
