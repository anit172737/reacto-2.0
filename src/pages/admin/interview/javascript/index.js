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
import {
  deleteJsQtn,
  fetchJsQtnList,
  setOpenDeleteForm,
  setOpenForm,
  setSelecetd,
} from "./store";
import { Button } from "reactstrap";
import { Edit, Trash2 } from "react-feather";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "../../../../sass/pages/admin/columns.scss";
import DeleteForm from "../../../../components/deleteForm";
import CustomPagination from "../../../../components/customPagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { jsQtnList, openForm, openDeleteForm, selected, total } = useSelector(
    (state) => state.javascriptMaster
  );
  const dispatch = useDispatch();
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
        <span
          className="text-capitalize "
          style={{ fontSize: "18px", padding: "5px", lineHeight: "20px" }}
          dangerouslySetInnerHTML={{ __html: row.answer }}
        ></span>
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
              onClick={() => handleOpenEditForm(row)}
            >
              <Edit className="font-medium-2 btn_edit" />
            </Button>
            <Button
              size={20}
              color="transparent"
              className="btn"
              onClick={() => handleOpenDeleteForm(row)}
            >
              <Trash2 className="font-medium-2 btn_delete" />
            </Button>
            {/* )} */}
          </div>
        );
      },
    },
  ];

  const dataToRender = () => {
    return jsQtnList;
  };

  const handleDelete = (payload) => {
    dispatch(deleteJsQtn(payload));
    dispatch(setOpenDeleteForm(false));
    dispatch(setSelecetd(null));
  };

  const deleteConfig = {
    deleteFunction: handleDelete,
    payload: {
      id: selected?.id,
      search,
      pageSize,
      pageNumber: currentPage,
    },
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
  };

  const renderPaginationComponent = () => {
    return (
      <CustomPagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={total}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        handlePageSizeChange={handlePageSizeChange}
      />
    );
  };
  const handleAdd = () => {
    dispatch(setOpenForm(true));
  };

  const handleOpenEditForm = (row) => {
    dispatch(setSelecetd(row));
    dispatch(setOpenForm(true));
  };

  const handleOpenDeleteForm = (row) => {
    dispatch(setSelecetd(row));
    dispatch(setOpenDeleteForm(true));
  };

  useEffect(() => {
    window.top.document.title = "javascript";
    const payload = {
      search: search,
      pageSize,
      pageNumber: currentPage,
    };
    dispatch(fetchJsQtnList(payload));
  }, [search, pageSize, currentPage]);

  return (
    <div className="adminContainer">
      {openForm && (
        <AddForm search={search} pageSize={pageSize} pageNumber={currentPage} />
      )}
      {openDeleteForm && <DeleteForm {...deleteConfig} />}
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
        paginationComponent={renderPaginationComponent}
        // theme="solarized"
        customStyles={customStyles}
      />
    </div>
  );
};

export default JavascriptTable;
