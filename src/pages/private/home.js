import React, { useEffect } from "react";
import "../../sass/pages/private/home.scss";
import { useDispatch, useSelector } from "react-redux";
import { showLoginToast } from "../../redux/userSlices";
import { toast } from "react-hot-toast";

const Home = () => {
  const { loginToast, userData } = useSelector((state) => state.userMaster);
  const dispatch = useDispatch();

  if (loginToast === true) {
    toast.success("Login Successful!", { id: userData.userData.id });
  }

  useEffect(() => {
    setTimeout(() => {
      if (loginToast === true) {
        dispatch(showLoginToast(false));
      }
    }, 3000);
  }, []);

  console.log("loginToast", loginToast);

  return <div className="home">"Welcome To Reacto..."</div>;
};

export default Home;
