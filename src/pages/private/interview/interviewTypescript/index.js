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
  const [isTriggered, setIsTriggered] = useState(false);
  const [searchMenu, setSearchMenu] = useState();
  const dispatch = useDispatch();
  const payload = { search, pageSize, pageNumber: currentPage, setLoader };

  useEffect(() => {
    setIsTriggered(true);
    if (isTriggered) {
      dispatch(fetchTypeQtnList(payload));
    }
  }, [search, pageSize, currentPage, isTriggered]);

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
      title="TypeScript"
      fetchQtnList={fetchTypeQtnList}
    />
  );
};

export default InterviewTypescript;
