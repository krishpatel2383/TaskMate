import api from "./api";

export const getTodos = (email) => {
  return api.post("todo/home", { email });
};

export const getTodoById = (id) => {
  return api.post("todo/details", { id });
};

export const deleteTodo = (id) => {
  return api.delete("todo/delete", { data: { id } });
};

export const CreateNewTodo = (todoDetails) => {
  return api.post("todo/create", todoDetails);
};

export const updateTodo = (todoDetails) => {
  return api.put("todo/update", todoDetails);
};
