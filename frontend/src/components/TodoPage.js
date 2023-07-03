import React, { useState, useEffect } from "react";
import logoImage from "../assets/images/logo.svg";
import { Link as RouteLink, useLocation, useNavigate } from "react-router-dom";
import { getTodos } from "../services/todoService";
import TodoItem from "./TodoItem";
import noDataImage from "../assets/images/noDataImage.png";
import { toast } from "react-toastify";

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos(email);
        if (response.status === 200) {
          setTodos(response.data);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const { errors } = error.response.data;
          Object.keys(errors).forEach((key) => {
            toast.error(errors[key]);
          });
        }
      }
    };
    fetchTodos();
  }, [email]);

  const handleTodoClick = (todoId) => {
    navigate(`/details/${todoId}`, { state: { email } });
  };

  const handleCreateTodo = (event) => {
    navigate(`/home/create`, { state: { email } });
  };

  let todoContent;
  if (todos.length === 0) {
    todoContent = (
      <div className="center fs-4 text-center">
        <img
          src={noDataImage}
          alt="noDataImage"
          className="image link img-fluid mx-auto mt-5"
          style={{ cursor: "pointer", width: "30%" }}
        />
        <h3 className="mt-5 mb-3">Sorry,we couldn't find any todos.</h3>
        <button className="btn btn-success" onClick={handleCreateTodo}>
          Create New
        </button>
      </div>
    );
  } else {
    todoContent = (
      <div className="row">
        {todos.map((todo) => (
          <div className="col-md-6 mb-4" key={todo.id}>
            <div
              className="link-underline link-underline-opacity-0"
              style={{ cursor: "pointer" }}
              onClick={() => handleTodoClick(todo.id)}
            >
              <TodoItem todo={todo} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <RouteLink to="/">
            <img className="navbar-brand" src={logoImage} alt="logo" />
          </RouteLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <div className="navbar-nav">
              <button
                type="button"
                className="nav-link btn btn-success text-white me-3"
                smooth={true}
                duration={500}
                style={{ cursor: "pointer" }}
                onClick={handleCreateTodo}
              >
                Create new Todo
              </button>

              <RouteLink className="btn login me-3">Log Out</RouteLink>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-3">{todoContent}</div>
    </div>
  );
}

export default TodoPage;
