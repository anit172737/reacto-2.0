import React, { useEffect, useState } from "react";
import "../../../../sass/pages/private/interviewQ.scss";
import { useDispatch } from "react-redux";
import { fetchTypeQtnList } from "../../../admin/interview/typescript/store";
import UserComponent from "../../../../components/userComponent";

const InterviewTypescript = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loader, setLoader] = useState(false);
  const [searchMenu, setSearchMenu] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = { search, pageSize, pageNumber: currentPage, setLoader };
    dispatch(fetchTypeQtnList(payload));
  }, [search, pageSize, currentPage]);

  return (
    <UserComponent
      search={search}
      setSearch={setSearch}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      loader={loader}
      setLoader={setLoader}
      searchMenu={searchMenu}
      setSearchMenu={setSearchMenu}
      master="typeMaster"
      title="Type"
      fetchQtnList={fetchTypeQtnList}
    />
  );
};

export default InterviewTypescript;
