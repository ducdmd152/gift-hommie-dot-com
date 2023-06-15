import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ErrorPage = () => {
  const navigate = useNavigate();
  const onNoti = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: "<a>Why do I have this issue?</a>",
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(() => {
      navigate("/");
    }, 1900);
  };
  return <div></div>;
};

export default ErrorPage;
