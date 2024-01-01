import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "../../../../sass/pages/admin/form.scss";

import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import {
  addJsQtn,
  setOpenForm,
  setSelecetd,
  jsQtnList,
  editJsQtn,
} from "./store";
import { Editor } from "@tinymce/tinymce-react";
import { textEditorInit } from "../../../../components/textEditorInit";
import { Watch } from "react-feather";
// import { addContact, editContact, selectContact, setLoader } from "./store";

const defaultValues = {
  question: "",
  answer: "",
};
const AddForm = () => {
  const { selected } = useSelector((state) => state.javascriptMaster);
  const [sub, setSubmit] = useState(false);
  // console.log("selected", selected);
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

  const handleEditorChange = (e) => {
    // setValue("answer", e.level.content);
    // setSubmit(false);
    console.log("sub", e);
  };

  const handleRemoveEditorError = (e) => {
    if (e) {
      setSubmit(false);
      setValue("answer", e);
      console.log("first");
    } else {
      setSubmit(true);
      setValue("answer", e);
      console.log("new");
    }
  };

  console.log("sub", sub);

  const onSubmit = async (data) => {
    console.log("data", data);

    let response = "";

    if (
      answerWatcher &&
      answerWatcher !== "<p><br></p>" &&
      answerWatcher !== '<p><br data-mce-bogus="1"></p>'
    ) {
      if (selected) {
        const modify = {
          id: selected.id,
          question: data.question,
          answer: data.answer,
        };

        response = await dispatch(editJsQtn(modify));
      } else {
        // await dispatch(setLoader(true));
        response = await dispatch(addJsQtn(data));
      }
    } else {
      setValue("answer", "");
    }

    if (response) {
      handleModalClosed();
    }
  };

  useEffect(() => {
    if (selected) {
      setValue("question", selected.question);
      setValue("answer", selected.answer);
    }
  }, []);

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
                    onChange={(e) => handleEditorChange(e)}
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

export default AddForm;
