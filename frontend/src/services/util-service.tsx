import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GLOBAL_CONTEXT } from "../App";
import sjcl from "sjcl";

export default {
  HEADER_HEIGHT: "100px",
  getCurrentUser() {
    const userJSON = localStorage.getItem("USER");
    let USER = null;
    if (userJSON) {
      USER = JSON.parse(userJSON);
    }
    return USER;
  },
  logout() {
    localStorage.removeItem("USER");
  },
  getURLImageFromFile(file: File | null) {
    if (file == null)
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    return URL.createObjectURL(file);
  },
  getURLImageUploadPresent() {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  },
  hashBySHA256(id: number | string) {
    // let message = id.toString();
    // const myBitArray = sjcl.hash.sha256.hash(message);
    // const myHash = sjcl.codec.hex.fromBits(myBitArray);
    // return myHash;
  },
};
