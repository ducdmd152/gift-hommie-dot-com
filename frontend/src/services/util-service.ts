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
  getURLImageFromFile(file: File | null) {
    if (file == null)
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    return URL.createObjectURL(file);
  },
  getURLImageUploadPresent() {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  },
};
