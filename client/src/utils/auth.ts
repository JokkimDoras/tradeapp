export const getToken = () => localStorage.getItem("token");
export const getLastSelectedAccount = () => localStorage.getItem('selectedAccount')

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("fullname");
  localStorage.removeItem("email");
};
