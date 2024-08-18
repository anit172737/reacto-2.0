import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import "../../sass/pages/public/login.scss";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { LoginContext } from "../../utility/loginContext";
import axios from "axios";
import { baseUrl } from "../../app.config";

const GoogleLoginBtn = () => {
  const { setGoogleLogin, setUser } = useContext(LoginContext);
  const baseUrl = window.location.origin.includes("localhost")
    ? process.env.REACT_APP_API_BASE_URL_UAT
    : process.env.REACT_APP_API_BASE_URL_LIVE;
  baseUrl;
  const navigate = useNavigate();
  const clientId =
    "1014433680425-9qjpd7cmkgtvhsdamvv762ploeb3baer.apps.googleusercontent.com";

  const onSuccess = async (res) => {
    console.log("Login Success!", res.profileObj);
    localStorage.setItem("googleLogin", "yes");
    setUser(res.profileObj.email);
    const data = {
      email: res.profileObj.email,
    };
    try {
      const response = await axios.post(baseUrl + "/user/googleLogin", data);
      if (!response.data.error) {
        navigate("/home");
        // Cookies.set("token", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", "false");
        setGoogleLogin(true);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }

    // localStorage.setItem("token", "aniii");
    // navigate("/home");
  };

  const onFailure = (res) => {
    console.log("Login Failed!", res);
  };
  return (
    <div>
      <GoogleLogin
        className="googleLogin"
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default GoogleLoginBtn;
