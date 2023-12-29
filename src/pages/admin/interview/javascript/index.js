import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { ChevronDown } from "react-feather";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../../../components/adminHeader";
import DataTable, { createTheme } from "react-data-table-component";
import { columns } from "./Columns";
import AddForm from "./Form";
import "../../../../sass/pages/admin/container.scss";
import { fetchJsQtnList, setOpenForm, setSelecetd } from "./store";import { Button } from "reactstrap";
import { Edit, Trash2 } from "react-feather";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "../../../../sass/pages/admin/columns.scss";

createTheme(
  "solarized",
  {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const customStyles = {
  rows: {
    style: {
      minHeight: "45px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "16px",
      fontSize: "18px",
      background: "#6c63ff",
      color: "white",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "16px !important",
    },
  },
};


const JavascriptTable = () => {
  const [search, setSearch] = useState("");
  const { jsQtnList,openForm } = useSelector((state) => state.javascriptMaster);
  const dispatch = useDispatch();

  const handleEdit = (row) => {
    dispatch(setSelecetd(row))
   dispatch(setOpenForm(true))
  }

  const columns = [
    {
      name: "QUESTION",
      selector: "question",
      width: "40%",
      sortable: false,
      selector: (row) => row.question,
      cell: (row) => (
        <span className="text-capitalize " style={{ fontSize: "18px" }}>
          {row.question}
        </span>
      ),
    },
    {
      name: "ANSWER",
      selector: "answer",
      width: "40%",
      sortable: false,
      selector: (row) => row.answer,
      cell: (row) => (
        //   row?.answer?.length > 20 ? (
        //     <OverlayTrigger
        //       placement="bottom"
        //       trigger={["hover", "focus"]}
        //       overlay={
        //         <Tooltip id="toolTip">
        //           <div className="toolTip" style={{ fontSize: "22px" }}>
        //             {row.answer}
        //           </div>
        //         </Tooltip>
        //       }
        //     >
        //       <span className="table_row description" style={{ fontSize: "22px" }}>
        //         {row.answer}
        //       </span>
        //     </OverlayTrigger>
        //   ) : (
        //     <span style={{ fontSize: "22px" }}>{row.answer || "-"}</span>
  
        //   ),
        <span className="text-capitalize " style={{ fontSize: "18px" }}>
          {row.answer}
        </span>
      ),
    },
    {
      name: "ACTIONS",
      width: "20%",
      cell: (row) => {
        return (
          <div
            className="align-items-center permissions-actions"
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Button
              size="sm"
              color="transparent"
              className="btn"
              onClick={() => handleEdit(row)}
            >
              <Edit className="font-medium-2 btn_edit" />
            </Button>
            <Button
              size={20}
              color="transparent"
              className="btn"
              //   onClick={() => {
              //     setSelectedRows([row])
              //     dispatch(selectDesignation(row))
              //     setDeleteModal(true)
              //   }}
            >
              <Trash2 className="font-medium-2 btn_delete" />
            </Button>
            {/* )} */}
          </div>
        );
      },
    },
  ];

  console.log('jsQtn', jsQtnList)

  const dataToRender = () => {
    return jsQtnList;
  };

  const handleAdd = () => {
   dispatch(setOpenForm(true)) 
  };

  useEffect(() => {
    dispatch(fetchJsQtnList());
  }, []);

  return (
    <div className="adminContainer">
      {openForm && <AddForm setOpenForm={setOpenForm} />}
      <AdminHeader
        title="Javascript Data Table"
        setSearch={setSearch}
        handleAdd={handleAdd}
      />
      <DataTable
        pagination
        subHeader={false}
        noHeader={true}
        responsive
        highlightOnHover
        paginationServer
        progressComponent={<Circles />}
        columns={columns}
        data={dataToRender()}
        sortIcon={<ChevronDown />}
        className="react-dataTable"
        //   paginationComponent={renderPaginationComponent}
        // theme="solarized"
        customStyles={customStyles}
      />
    </div>
  );
};

export default JavascriptTable;
