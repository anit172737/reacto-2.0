import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { showLoginToast } from "../../../redux/userSlices";
import { toast, Toaster } from "react-hot-toast";

const Dashboard = () => {
  const { loginToast, userData } = useSelector((state) => state.userMaster);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (loginToast === true) {
        dispatch(showLoginToast(false));
      }
    }, 3000);
  }, []);

  if (loginToast === true) {
    toast.success("Login Successful!", { id: userData?.userData?.id });
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
