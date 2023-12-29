import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { handleLogout } from "../redux/userSlices";
// import { handleLogout } from "../utility/helperFunctions";

const AdminRoute = (props) => {
  const [token, setToken] = useState(true);
  const isAuthenticated = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
  const dispatch = useDispatch();

  setTimeout(() => {
    setToken(false);
    // handleLogout();
    dispatch(handleLogout);
  }, 3600000);

  if (isAuthenticated && token && isAdmin === "true") {
    return props.children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute;
