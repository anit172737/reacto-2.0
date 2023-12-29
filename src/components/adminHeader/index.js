import React from "react";
import "../../sass/components/header.scss";

const AdminHeader = ({ title, setSearch, handleAdd }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
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
      <input
        className="header_addBtn"
        type="button"
        value="ADD"
        onClick={handleAdd}
      />
    </div>
  );
};

export default AdminHeader;
