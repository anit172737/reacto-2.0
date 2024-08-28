import React, { useEffect, useRef, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DataTable, { createTheme } from "react-data-table-component";
import "../../../../sass/pages/admin/container.scss";
import {
  deleteJsQtn,
  fetchJsQtnList,
  setOpenDeleteForm,
  setOpenForm,
  setSelecetd,
  addJsQtn,
  editJsQtn,
} from "./store";
import "../../../../sass/pages/admin/columns.scss";
import AdminComponent from "../../../../components/adminComponent";
import {
  handleOffline,
  handleOnline,
} from "../../../../utility/helperFunctions";

const JavascriptTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loader, setLoader] = useState(false);
  const [isOnlineTriggered, setIsOnlineTriggered] = useState(false);
  const [isOfflineTriggered, setIsOfflineTriggered] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const dispatch = useDispatch();
  const toastId = useRef(null); // To track the current toast ID

  const payload = {
    search: search,
    pageSize,
    pageNumber: currentPage,
    setLoader,
  };

  useMemo(() => {
    if (isOnlineTriggered) {
      dispatch(fetchJsQtnList(payload));
    }
  }, [isOnlineTriggered]);

  useEffect(() => {
    window.top.document.title = "javascript";
    setIsTriggered(true);
    if (isTriggered && navigator.onLine) {
      dispatch(fetchJsQtnList(payload));
    } else {
      setIsOfflineTriggered(true);
      if (isOfflineTriggered) {
        toast.error("You are offline.");
      }
    }
  }, [search, pageSize, currentPage, isTriggered]);

  useEffect(() => {
    window.addEventListener("online", () =>
      handleOnline({ setIsOnlineTriggered, toast, toastId })
    );
    window.addEventListener("offline", () =>
      handleOffline({ setIsOnlineTriggered, toast, toastId })
    );

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", () =>
        handleOnline({ setIsOnlineTriggered, toast, toastId })
      );
      window.removeEventListener("offline", () =>
        handleOffline({ setIsOnlineTriggered, toast, toastId })
      );
    };
  }, []);

  return (
    <>
      <AdminComponent
        search={search}
        setSearch={setSearch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loader={loader}
        setLoader={setLoader}
        fetchQtnList={fetchJsQtnList}
        setOpenDeleteForm={setOpenDeleteForm}
        setOpenForm={setOpenForm}
        setSelecetd={setSelecetd}
        title="Javascript"
        master="javascriptMaster"
        deleteQtn={deleteJsQtn}
        editQtn={editJsQtn}
        addQtn={addJsQtn}
      />
    </>
  );
};

export default JavascriptTable;
