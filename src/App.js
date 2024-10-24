import React, { Suspense, useState, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { LoginContext } from "./utility/loginContext";
import { Audio } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const App = () => {
  const [googleLogin, setGoogleLogin] = useState(false);
  const [drop, setDrop] = useState(false);
  const googleLogoutRef = useRef(null);
  return (
    <LoginContext.Provider
      value={{ googleLogin, setGoogleLogin, drop, setDrop, googleLogoutRef }}
    >
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
      >
        <div
          style={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Suspense
            fallback={
              <Audio
                height="70"
                width="70"
                radius="9"
                color="#7e77fd"
                ariaLabel="loading"
              />
            }
          >
            <RouterProvider router={router} />
            <Toaster
              toastOptions={{
                className: "",
                style: {
                  fontSize: "18px",
                },
              }}
            />
          </Suspense>
        </div>
      </GoogleReCaptchaProvider>
    </LoginContext.Provider>
  );
};

export default App;
