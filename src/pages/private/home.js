import React, { useContext, useEffect } from "react";
import "../../sass/pages/private/home.scss";
import { useDispatch, useSelector } from "react-redux";
import { showLoginToast } from "../../redux/userSlices";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../utility/loginContext";

const Home = () => {
  const { loginToast, userData } = useSelector((state) => state.userMaster);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { drop, setDrop } = useContext(LoginContext);

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

  const qtnsArray = [
    {
      name: "HTML",
      total: "30",
      path: "/interview-html",
    },
    {
      name: "CSS",
      total: "10",
      path: "/interview-css",
    },
    {
      name: "Javascript",
      total: "40",
      path: "/interview-javascript",
    },
    {
      name: "ReactJS",
      total: "30",
      path: "/interview-react",
    },
    {
      name: "NextJS",
      total: "20",
      path: "/interview-next",
    },
    {
      name: "TypeScript",
      total: "08",
      path: "/interview-typescript",
    },

    {
      name: "NodeJS",
      total: "20",
      path: "/interview-node",
    },
    {
      name: "ExpressJS",
      total: "25",
      path: "/interview-express",
    },
    {
      name: "MongoDB",
      total: "10",
      path: "/interview-mongo",
    },
  ];

  const handleNavigate = (qtn) => {
    navigate(qtn.path);
    setDrop(true);
  };

  return (
    <div className="home">
      {qtnsArray.map((qtn) => {
        return (
          <div className="home_card" onClick={() => handleNavigate(qtn)}>
            <h6 className="home_card-title">Interview Questions </h6>
            <h3>{qtn.name}</h3>
            <h6 className="home_card-h6">{qtn.total}</h6>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
