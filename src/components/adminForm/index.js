import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import "../../sass/pages/admin/form.scss";

import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import { textEditorInit } from "../textEditorInit";
import { Trash, Trash2 } from "react-feather";
// import { addContact, editContact, selectContact, setLoader } from "./store";

const defaultValues = {
  question: "",
  answer: "",
  descTitle: "",
  desc: "",
};
const AdminForm = ({
  search,
  pageNumber,
  pageSize,
  setLoader,
  addQtn,
  setOpenForm,
  setSelecetd,
  editQtn,
  master,
}) => {
  const { selected } = useSelector((state) => state[master]);
  const [sub, setSubmit] = useState(false);
  const [preview, setPreview] = useState();
  const [desc, setDesc] = useState();
  const dispatch = useDispatch();
  const {
    reset,
    control,
    setError,
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const answerWatcher = watch("answer");

  const handleModalClosed = () => {
    dispatch(setOpenForm(false));
    dispatch(setSelecetd(null));
    reset();
  };

  const handleRemoveEditorError = (e) => {
    if (e) {
      setSubmit(false);
      setValue("answer", e);
    } else {
      setSubmit(true);
      setValue("answer", e);
    }
  };

  const handleDescChange = (e) => {
    setValue("desc", e.target.files[0]);
    setDesc(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    let response = "";
    const formData = new FormData();
    formData.append("question", data?.question);
    formData.append("answer", data?.answer);
    formData.append("desc", data?.desc ? data.desc : "");
    formData.append("descTitle", data?.descTitle);
    formData.append("loading", false);
    formData.append("speaking", false);

    if (
      answerWatcher &&
      answerWatcher !== "<p><br></p>" &&
      answerWatcher !== '<p><br data-mce-bogus="1"></p>'
    ) {
      if (selected) {
        const modify = {
          data: formData,
          id: selected.id,
          search,
          pageSize,
          pageNumber,
          setLoader,
        };
        response = await dispatch(editQtn(modify));
      } else {
        // await dispatch(setLoader(true));
        const payload = {
          data: { ...data, loading: false, speaking: false },
          search,
          pageSize,
          pageNumber,
          setLoader,
        };
        response = await dispatch(addQtn(payload));
      }
    } else {
      setValue("answer", "");
    }

    if (response) {
      handleModalClosed();
    }
    // for (let pair of formData.entries()) {
    //   console.log("pair[]", pair[0], pair[1]);
    // }
  };

  useEffect(() => {
    if (selected) {
      setValue("question", selected?.question);
      setValue("answer", selected?.answer);
      setValue("descTitle", selected?.descTitle);

      let lastIndexOfSlash = selected?.desc?.lastIndexOf("/");
      let filename;
      if (lastIndexOfSlash !== -1) {
        filename = selected?.desc?.substring(lastIndexOfSlash + 1);
      }
      setValue("desc", selected?.desc ? selected?.desc : "");
      setDesc(selected?.desc ? { name: filename } : "");
    }
  }, []);

  console.log("preview", preview);

  useEffect(() => {
    if (!desc) return;

    const imageUrl = selected?.desc
      ? selected?.desc
      : URL.createObjectURL(desc);
    setPreview(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [desc]);

  console.log("desc", desc);

  return (
    <div className="addModal">
      <div className="addModal__content">
        <div className="addModal__content--header">
          <h2 className="addModal__content--header-h2">
            {selected ? "Edit" : "Add"} Question
          </h2>
        </div>

        <Row tag={Form} className="p-2" onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12} className="addModal__content--body">
            <div className="addModal__content--input">
              <Label
                className="form-label addModal__content--input-label"
                for="question"
              >
                Question <span style={{ color: "orangered" }}>*</span>
              </Label>
              <Controller
                id="question"
                name="question"
                control={control}
                render={({ field }) => (
                  <textarea
                    className="addModal__content--input-1"
                    placeholder="Enter Question"
                    {...register("question", {
                      required: "Please enter Question ",
                      // pattern: {
                      //   value: characterRegex,
                      //   message: 'Allow Only 100 Character'
                      // }
                    })}
                    invalid={errors.question ? true : false}
                    {...field}
                  />
                )}
              />
              {errors && errors.question && (
                <div style={{ color: "orangered", fontSize: "17px" }}>
                  {errors.question.message}
                </div>
              )}
            </div>

            <div className="addModal__content--input">
              <Label
                className="form-label addModal__content--input-label"
                for="answer"
              >
                Answer <span style={{ color: "orangered" }}>*</span>
              </Label>
              <Controller
                id="answer"
                name="answer"
                control={control}
                render={({ field }) => (
                  <Editor
                    className="addModal__content--input-editor"
                    apiKey="ft4u5opuf9nmnna342rx6cpg1n959nwska3vifnnxrwprg4v"
                    value={answerWatcher ? answerWatcher : ""}
                    init={textEditorInit}
                    // onChange={(e) => handleEditorChange(e)}
                    onEditorChange={(e) => handleRemoveEditorError(e)}
                  />
                )}
              />
              {answerWatcher === "" && sub && (
                <div style={{ color: "orangered", fontSize: "17px" }}>
                  Please Enter Answer
                </div>
              )}
            </div>
            <div className="addModal__content--input">
              <Label
                className="form-label addModal__content--input-label"
                for="answer"
              >
                Description Title
                {/* <span style={{ color: "orangered" }}>*</span> */}
              </Label>
              <Controller
                id="descTitle"
                name="descTitle"
                control={control}
                render={({ field }) => (
                  <input
                    className="addModal__content--input-1"
                    placeholder="Enter description title"
                    // {...register("descTitle", {
                    //   required: "Please enter description title ",
                    // pattern: {
                    //   value: characterRegex,
                    //   message: 'Allow Only 100 Character'
                    // }
                    // })}
                    // invalid={errors.question ? true : false}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="addModal__content--input">
              <Label
                className="form-label addModal__content--input-label"
                for="question"
              >
                Description Image
                {/* <span style={{ color: "orangered" }}>*</span> */}
              </Label>
              <Controller
                id="desc"
                name="desc"
                control={control}
                render={({ field }) => (
                  <>
                    {desc === "" || desc?.name === undefined ? (
                      <Input
                        type="file"
                        className="addModal__content--input-1"
                        onChange={handleDescChange}
                      />
                    ) : (
                      <div className="addModal__content--desc">
                        <Input
                          className="addModal__content--input-1"
                          value={desc?.name}
                        />
                        <Trash2
                          className="addModal__content--input-delete"
                          onClick={() => (
                            setDesc(""), setValue("desc", ""), setPreview("")
                            // clearErrors("desc"),
                            // setInvalidLogoSize(false),
                            // setInvalidFileType(false)
                          )}
                        />
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            {preview && (
              <img className="addModal__content--preview" src={preview} />
            )}
          </Col>

          <Col xs={12} className="addModal__content--footer">
            <Button
              className="addModal__content--footer-btn"
              type="submit"
              onClick={() => setSubmit(true)}
            >
              Submit
            </Button>
            <button
              className="addModal__content--footer-btn addModal__content--footer-btn-close"
              onClick={handleModalClosed}
            >
              Close
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminForm;
