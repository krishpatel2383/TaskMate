import React from "react";
import "../css/TodoItem.css";
import { priorityMapping } from "../utils/priorityMapping";

const TodoItem = ({ todo }) => {
  const { title, dueDate, priority } = todo;
  const formattedDate = new Date(dueDate).toLocaleDateString();
  return (
    <div class="card todo-item">
      <div class="card-body">
        <h5 class="card-title text-white" style={{ overflow: "hidden" }}>
          {title}
        </h5>
        <p class="card-text mt-3">
          <div>Due date: {formattedDate}</div>
          <div className="mt-1">Priority: {priorityMapping[priority]}</div>
        </p>
      </div>
    </div>
  );
};

export default TodoItem;
