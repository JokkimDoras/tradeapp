export const getToken = () => localStorage.getItem("token");

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("fullname");
  localStorage.removeItem("email");
};