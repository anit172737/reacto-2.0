import React from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/not-found.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("isAdmin");
  return (
    <div className="notFound">
      <h1>404 Page Not Found!</h1>
      <input
        className="notFound_btn"
        type="button"
        value={
          admin === "false"
            ? "Way to Home"
            : admin === "true"
            ? "Way to Dashboard"
            : "Way to Login"
        }
        onClick={() =>
          admin === "false"
            ? navigate("/home")
            : admin === "true"
            ? navigate("/dashboard")
            : navigate("/")
        }
      />
    </div>
  );
};

export default NotFound;
