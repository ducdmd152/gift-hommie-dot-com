import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GLOBAL_CONTEXT } from "../App";

const useAfterAuthenticated = () => {
  const [execute, setExecute] = useState(false);
  const navigate = useNavigate();
  const reload = useContext(GLOBAL_CONTEXT).rerender;

  if (execute) {
    reload();
    navigate("/");
  }

  return {
    afterAuthenticatedExecuting: () => {
      setExecute(false);
      setExecute(true);
    },
  };
};

export default useAfterAuthenticated;
