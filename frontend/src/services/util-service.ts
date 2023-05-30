export default {
  HEADER_HEIGHT: "100px",
  getCurrentUser() {
    const userJSON = sessionStorage.getItem("USER");
    let USER = null;
    if (userJSON) {
      USER = JSON.parse(userJSON);
    }
    return USER;
  },
  logout() {
    sessionStorage.removeItem("USER");
    window.location.href = "/";
  },
};
