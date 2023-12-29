import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "../sass/layouts/privateLayout.scss";
import { Audio } from "react-loader-spinner";
import AdminSidebar from "../components/adminSidebar";

const AdminLayout = () => {
  return (
    <div className="privateLayout">
      <div className="privateLayout_container">
        <AdminSidebar />
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

export default AdminLayout;
