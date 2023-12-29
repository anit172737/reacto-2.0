import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { privateGet } from "../../../../services/privateRequest";
import AdminHeader from "../../../../components/adminHeader";

const ReactTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const fetchData = async () => {
    try {
      await privateGet("/react/questionreact").then((res) =>
        setData(res.data.data)
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="adminContainer">
      <AdminHeader title="React Data Table" setSearch={setSearch} />
    </div>
  );
};

export default ReactTable;
