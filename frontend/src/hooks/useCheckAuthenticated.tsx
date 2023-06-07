import React from "react";

const useCheckAuthenticated = () => {
  const navigate = useNavigate();
  const reload = useContext(GLOBAL_CONTEXT).rerender;
  reload();
  navigate("/");
  return <div>useCheckAuthenticated</div>;
};

export default useCheckAuthenticated;
