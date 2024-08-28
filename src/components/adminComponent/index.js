import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ChevronDown } from "react-feather";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import DataTable, { createTheme } from "react-data-table-component";
import "../../sass/pages/admin/container.scss";
import { Button } from "reactstrap";
import { Edit, Trash2 } from "react-feather";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "../../sass/pages/admin/columns.scss";
import DeleteForm from "../deleteForm";
import CustomPagination from "../customPagination";
import AddForm from "../../pages/admin/interview/javascript/Form";
import AdminHeader from "../adminHeader";
import toast from "react-hot-toast";
import AdminForm from "../adminForm";

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

const UserComponent = ({
  search,
  setSearch,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loader,
  setLoader,
  title,
  master,
  deleteQtn,
  fetchQtnList,
  setOpenDeleteForm,
  setOpenForm,
  setSelecetd,
  editQtn,
  addQtn,
}) => {
  const { qtnList, openForm, openDeleteForm, selected, total } = useSelector(
    (state) => state[master]
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
    return qtnList;
  };

  const handleDelete = (payload) => {
    dispatch(deleteQtn(payload));
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
      setLoader,
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

  return (
    <div className="adminContainer">
      {openForm && (
        <AdminForm
          search={search}
          pageSize={pageSize}
          pageNumber={currentPage}
          setLoader={setLoader}
          addQtn={addQtn}
          setOpenForm={setOpenForm}
          setSelecetd={setSelecetd}
          editQtn={editQtn}
          master={master}
        />
      )}
      {openDeleteForm && <DeleteForm {...deleteConfig} />}
      <AdminHeader
        title={`${title} Data Table`}
        setSearch={setSearch}
        handleAdd={handleAdd}
      />
      {!loader ? (
        <DataTable
          pagination
          subHeader={false}
          noHeader={true}
          responsive
          highlightOnHover
          paginationServer
          progressComponent={<ThreeDots />}
          columns={columns}
          data={dataToRender()}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={renderPaginationComponent}
          // theme="solarized"
          customStyles={customStyles}
        />
      ) : (
        <div style={{ display: "grid", justifyContent: "center" }}>
          <ThreeDots size={10} color="#6c63ff" />
        </div>
      )}
    </div>
  );
};

export default UserComponent;
