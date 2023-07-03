import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { deleteTodo, getTodoById } from "../services/todoService";
import { priorityMapping } from "../utils/priorityMapping";
import { toast } from "react-toastify";

const TodoDetails = () => {
  const { todoId } = useParams();
  const [todo, setTodo] = useState(null);
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const response = await getTodoById(todoId);
        if (response.status === 200) {
          setTodo(response.data);
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

    fetchTodoDetails();
  }, [todoId]);

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todoId);
      navigate(`/home`, { state: { email } });
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  if (todo === null) {
    return <p>Loading...</p>;
  }

  const formattedDate = new Date(todo.createdOn).toLocaleString();

  return (
    <div className="container m-3">
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => navigate("/home", { state: { email } })}
      >
        Go back
      </button>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <h5 className="card-title fs-2">{todo.title}</h5>
          <div className="card-text">
            <div className="mb-3 mt-3">Description: {todo.description}</div>
            <div className="mb-3">Due Date: {todo.dueDate}</div>
            <div className="mb-3">
              Priority: {priorityMapping[todo.priority]}
            </div>
            <div>Created on: {formattedDate}</div>
            <div className="mt-2">
              <button
                className="btn btn-success me-3"
                onClick={() =>
                  navigate(`update`, { state: { email, currentTodo: todo } })
                }
              >
                Update
              </button>
              <button
                className="btn btn-danger me-2"
                onClick={handleDeleteTodo}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
