import React from "react";
import "../../sass/components/header.scss";

const Header = ({ title, setSearch, setCurrentPage }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  return (
    <div className="header">
      <h2>{title}</h2>
      <input
        className="header_search"
        type="input"
        placeholder="🔍 Search..."
        onChange={handleChange}
      />
    </div>
  );
};

export default Header;
