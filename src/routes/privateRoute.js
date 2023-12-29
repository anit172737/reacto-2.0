import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LoginContext } from "../utility/loginContext";
// import { handleLogout } from "../utility/helperFunctions";
import { useDispatch } from "react-redux";
import { handleLogout } from "../redux/userSlices";
// import jwt from "jsonwebtoken";

const PrivateRoute = (props) => {
  const [token, setToken] = useState(true);
  const isAdmin = localStorage.getItem("isAdmin");
  const isAuthenticated = localStorage.getItem("token");
  const dispatch = useDispatch();

  // const parseJwt = (token) => {
  //   try {
  //     return JSON.parse(atob(token.split(".")[1]));
  //   } catch (e) {
  //     return null;
  //   }
  // };

  setTimeout(() => {
    setToken(false);
    // handleLogout();
    dispatch(handleLogout);
  }, 3600000);

  // function isTokenExpired(token) {
  //   const decodedToken = parseJwt(token);
  //   console.log("decodedToken.exp", decodedToken?.exp * 1000 - Date.now());
  //   // Check if the token's expiration time (exp) is in the past
  //   if (decodedToken?.exp * 1000 < Date.now()) {
  //     return true; // Token is expired\
  //   }

  //   return false; // Token is not expired
  // }

  if (isAuthenticated && token && isAdmin === "false") {
    return props.children;
    // localStorage.clear();
    // <Navigate to="/" replace />;
  } else {
    // toast.error("Session Expired");
    return <Navigate to="/" replace />;
    // return props.children;
  }
};

export default PrivateRoute;
