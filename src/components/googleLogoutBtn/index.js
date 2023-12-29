import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { LoginContext } from "../../utility/loginContext";
import { useNavigate } from "react-router-dom";
import "../../sass/pages/public/login.scss";

const GoogleLogoutBtn = () => {
  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const clientId =
    "1014433680425-9qjpd7cmkgtvhsdamvv762ploeb3baer.apps.googleusercontent.com";

  const onSuccess = (res) => {
    console.log("Logout Success!");
    setUser(null);
    localStorage.clear();
    navigate("/");
    // setGoogleLogin(false);
  };

  return (
    <>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        className="googleLogout"
        // ref={googleLogoutRef}
      />
    </>
  );
};

export default GoogleLogoutBtn;
