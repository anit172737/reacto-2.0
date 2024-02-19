import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "../../sass/components/pagination.scss";
import { Input } from "reactstrap";

const CustomPagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    handlePageSizeChange,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  let lastPage =
    paginationRange && paginationRange[paginationRange?.length - 1];
  return (
    <div className="content">
      <div>
        <select
          className="content-select"
          //   type="select"
          id="rows-per-page"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(e)}
          style={{ width: "5rem" }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          {totalCount >= 25 ? (
            <option value="25">25</option>
          ) : (
            totalCount <= 50 ||
            (totalCount > 25 && <option value="50">50</option>)
          )}

          {/* <option value={`${totalCount}`}>All</option> */}
        </select>
        &nbsp;/&nbsp;<label>{totalCount}</label>&nbsp;&nbsp;
        <label htmlFor="rows-per-page">Entries</label>
      </div>
      <div className="pagination">
        <ul
          className={classnames("pagination-container", {
            [className]: className,
          })}
        >
          <li
            className={classnames("pagination-item", {
              disabled: currentPage === 1,
            })}
            onClick={onPrevious}
          >
            <div>{"<<"}</div>
          </li>
          {paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return <li className="pagination-item dots">&#8230;</li>;
            }

            return (
              <li
                className={classnames("pagination-item", {
                  selected: pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}
          <li
            className={classnames("pagination-item", {
              disabled: currentPage === lastPage,
            })}
            onClick={onNext}
          >
            <div>{">>"}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomPagination;
