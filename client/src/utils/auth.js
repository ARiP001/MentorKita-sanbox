// Auth utility functions
export const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  window.location.href = "/loginUser";
};

export const setAuthData = (accessToken, refreshToken, role, userId) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("userRole", role);
  localStorage.setItem("userId", userId);
};
