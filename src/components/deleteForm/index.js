import React from "react";
import { Trash2 } from "react-feather";
import { useDispatch } from "react-redux";
import { setOpenDeleteForm } from "../../pages/admin/interview/javascript/store";

const DeleteForm = ({ deleteFunction, payload }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    deleteFunction(payload);
  };
  return (
    <div className="addModal">
      <div className="deleteModal__content">
        <div className="addModal__content--header">
          <h3 className="mb-0">Are You Sure ?</h3>
          <small>"You won't revert this!"</small>
        </div>
        <div
          style={{
            display: "grid",
            justifyContent: "center",
          }}
        >
          <Trash2 size={35} style={{ color: "orangered" }} />
        </div>

        <div className="addModal__content--footer addModal__content--footer-delete">
          <button
            className="addModal__content--footer-btn"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="addModal__content--footer-btn addModal__content--footer-btn-close"
            onClick={() => dispatch(setOpenDeleteForm(false))}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
