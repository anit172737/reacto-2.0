import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "../sass/layouts/privateLayout.scss";
import Sidebar from "../components/sidebar";
import { Audio } from "react-loader-spinner";

const PrivateLayout = () => {
  return (
    <div className="privateLayout">
      <div className="privateLayout_container">
        <Sidebar />
        <div className="privateLayout_container-outletSec">
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
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
