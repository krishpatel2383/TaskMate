import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateTodo } from "../services/todoService";
import { toast } from "react-toastify";

const UpdateTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, currentTodo } = location.state;
  const [todo, setTodo] = useState({
    id: currentTodo.id,
    title: currentTodo.title,
    description: currentTodo.description,
    dueDate: currentTodo.dueDate,
    priority: currentTodo.priority,
    user: email,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateTodo(todo);
      navigate(`/details/${todo.id}`, {
        state: { email, currentTodo },
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const { errors } = error.response.data;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key]);
        });
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="fw-bold fs-2 text-center m-4">Update todo</div>
      <form
        action=""
        className="w-50 m-auto"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div class="mb-3">
          <label for="title" class="form-label">
            Title:
          </label>
          <input
            type="text"
            class="form-control outline-input"
            id="title"
            name="title"
            value={todo.title}
            required
            onChange={handleInputChange}
          />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">
            Description:
          </label>
          <textarea
            class="form-control outline-input"
            id="description"
            name="description"
            value={todo.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="dueDate" class="form-label">
            Due Date:
          </label>
          <input
            type="date"
            class="form-control outline-input"
            id="dueDate"
            name="dueDate"
            value={todo.dueDate}
            required
            onChange={handleInputChange}
          />
        </div>

        <div class="mb-3">
          <label for="priority" class="form-label">
            Priority:
          </label>
          <select
            class="ms-3 p-2 border border-1 rounded"
            id="priority"
            name="priority"
            style={{ backgroundColor: "black" }}
            value={todo.priority}
            required
            onChange={handleInputChange}
          >
            <option value={0}>select priority</option>
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">
            Update Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTodo;
