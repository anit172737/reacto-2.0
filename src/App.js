import React, { Suspense, useState, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { LoginContext } from "./utility/loginContext";
import { Audio } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [googleLogin, setGoogleLogin] = useState(false);
  const [user, setUser] = useState(null);
  const googleLogoutRef = useRef(null);
  return (
    <LoginContext.Provider
      value={{ googleLogin, setGoogleLogin, user, setUser, googleLogoutRef }}
    >
      <div
        style={{
          display: "grid",
          alignItems: "center",
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
          <Toaster />
        </Suspense>
      </div>
    </LoginContext.Provider>
  );
};

export default App;
