import React, { useEffect, useRef, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import "../../../../sass/pages/admin/container.scss";
import {
  deleteTypeQtn,
  fetchTypeQtnList,
  setOpenDeleteForm,
  setOpenForm,
  setSelecetd,
  editTypeQtn,
  addTypeQtn,
} from "./store";
import "../../../../sass/pages/admin/columns.scss";
import AdminComponent from "../../../../components/adminComponent";
import {
  handleOffline,
  handleOnline,
} from "../../../../utility/helperFunctions";

const TypescriptTable = () => {
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
      dispatch(fetchTypeQtnList(payload));
    }
  }, [isOnlineTriggered]);

  useEffect(() => {
    window.top.document.title = "javascript";
    setIsTriggered(true);
    if (isTriggered && navigator.onLine) {
      dispatch(fetchTypeQtnList(payload));
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
        setOpenDeleteForm={setOpenDeleteForm}
        setOpenForm={setOpenForm}
        setSelecetd={setSelecetd}
        title="Typescript"
        master="typeMaster"
        deleteQtn={deleteTypeQtn}
        editQtn={editTypeQtn}
        addQtn={addTypeQtn}
        fetchQtnList={fetchTypeQtnList}
      />
    </>
  );
};

export default TypescriptTable;
