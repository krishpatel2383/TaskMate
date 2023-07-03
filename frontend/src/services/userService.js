import api from "./api";

export const loginUser = (email, password) => {
  return api.post("user/login", { email, password });
};

export const signupUser = (email, password) => {
  return api.post("user/signup", { email, password });
};

export const forgotPassword = (email) => {
  return api.post("user/forgot-password", { email });
};

export const resetPassword = (email, resetToken, newPassword) => {
  return api.post("user/reset-password", { email, resetToken, newPassword });
};
