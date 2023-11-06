
export const logout = async () => {
  localStorage.clear();
  window.location.href = "/login";
  return;
};
