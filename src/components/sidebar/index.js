import React, { useContext, useEffect, useState } from "react";
import "../../sass/components/sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "./sidebarMenu";
// import GoogleLogoutBtn from "../googleLogoutBtn";
import { LoginContext } from "../../utility/loginContext";

const Sidebar = () => {
  const { user } = useContext(LoginContext);
  const googleLogin = localStorage.getItem("googleLogin");
  const [data, setData] = useState(Menu);
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();
  console.log("user", user);

  const handleLogout = () => {
    console.log("Logout Success!");
    localStorage.clear();
    navigate("/");
  };

  const handleDrop = (name) => {
    for (let x in data) {
      if (data[x].navName === name) {
        setDrop(!drop);
        data[x].dropdown = !data[x].dropdown;
        // if (drop === false) {
        //   navigate("/home");
        // }
      } else {
        // setDrop(!drop);
        data[x].dropdown = false;
      }
    }
  };

  return (
    <div className="sidebar">
      {/* <div> */}
      <a
        href="/home"
        className="sidebar__nav--navlink sidebar__nav--navlink-title"
      >
        ☣ <span style={{ fontSize: "30px" }}>Reacto</span>
      </a>
      {/* </div> */}

      <div className="sidebar__nav">
        {data.map((data, index) => {
          return (
            <>
              {data.url ? (
                <NavLink
                  key={data.navName}
                  to={data.url}
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar__nav--navlink-active"
                      : "sidebar__nav--navlink"
                  }
                  // onClick={() => handleDrop(data.navName)}
                >
                  {data.icon} {data.navName}{" "}
                  {data.children ? data.dropIcon : ""}
                </NavLink>
              ) : (
                <div
                  key={data.navName}
                  className="sidebar__nav--navlink"
                  onClick={() => handleDrop(data.navName)}
                >
                  {data.icon} {data.navName} {data.children && data.dropIcon}
                </div>
              )}

              {data.dropdown && (
                <div
                  className={
                    data.dropdown
                      ? "sidebar__nav--dropdown"
                      : "sidebar__nav--dropdown-no"
                  }
                  // className="sidebar__nav--dropdown"
                >
                  {data.children.map((child) => {
                    return (
                      <NavLink
                        key={child.navName}
                        to={child.url}
                        className={({ isActive }) =>
                          isActive
                            ? "sidebar__nav--navlink-active sidebar__nav--navlink-active-pad"
                            : "sidebar__nav--navlink sidebar__nav--navlink-pad"
                        }
                      >
                        {child.icon} {child.navName}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="sidebar_p">
        {/* {googleLogin === 'yes' ? <GoogleLogoutBtn />:<input
          type="button"
          value="Logout"
          className="googleLogout"
          onClick={handleLogout}
        />} */}
        <input
          type="button"
          value="Logout"
          className="googleLogout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Sidebar;
