import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "../../../../sass/pages/admin/form.scss";

import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import { addJsQtn, setOpenForm, setSelecetd, jsQtnList, editJsQtn } from "./store";
// import { addContact, editContact, selectContact, setLoader } from "./store";

const defaultValues = {
  question: "",
  answer: "",
};
const AddForm = () => {
  const { selected, openForm,jsQtnList } = useSelector(state => state.javascriptMaster)
  console.log('selected', selected)
  // console.log('openForm', openForm)
  // const { selected, contactList } = useSelector(
  //   (state) => state?.contactMaster
  // );
  const dispatch = useDispatch();
  const {
    reset,
    control,
    setError,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleModalClosed = () => {
    dispatch(setOpenForm(false));
    dispatch(setSelecetd(null))
    reset();
    // dispatch(selectContact(null));
  };

  const onSubmit = async (data) => {
    console.log("data", data);

    let response = "";

    
    if (selected) {
      // await dispatch(setLoader(true));
      // const arr = jsQtnList.filter(e => e.id === selected.id)
      const modify = {
        id:selected.id,
        question: data.question,
        answer:data.answer
      }
    // const modifiedArray = jsQtnList.map((obj) => {
    //   if (obj.id === selected.id) {
    //     return {
    //       ...obj,
    //       question: data.question,
    //       answer: data.answer
    //     };
    //   }
    //   return obj;
    // });

    response = await dispatch(editJsQtn(modify));
      // toast.success("Question Edited Successfully",{id:data?.question});
    } else {
    // await dispatch(setLoader(true));
    response = await dispatch(addJsQtn(data))
      // toast.success("Question Added Successfully",{id:data?.question});
    }
    if (response) {
      handleModalClosed();
    }
  };

  useEffect(() => {
    if (selected) {
      // setValue("id", selected.id);
      setValue("question", selected.question);
      setValue("answer", selected.answer);
      // setValue("status", selected.status);
    }
  }, []);

  return (
    <div className="addModal">
      <div className="addModal__content">
        <div className="addModal__content--header">
          {/* <h2 className="mb-0">{selected ? "Edit" : "Add"} Contact</h2> */}
          <h2 className="addModal__content--header-h2">{selected ? 'Edit': 'Add'} Question</h2>
        </div>

        <Row tag={Form} className="p-2" onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12} className="addModal__content--body">
            <div className="addModal__content--input">
              <Label className="form-label addModal__content--input-label" for="question">
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
                <div style={{ color: "orangered",fontSize:'17px' }}>
                  {errors.question.message}
                </div>
              )}
            </div>

            <div className="addModal__content--input">
              <Label className="form-label addModal__content--input-label" for="answer">
                Answer <span style={{ color: "orangered" }}>*</span>
              </Label>
              <Controller
                id="answer"
                name="answer"
                control={control}
                render={({ field }) => (
                  <textarea
                    className="addModal__content--input-1"
                    placeholder="Enter Answer"
                    {...register("answer", {
                      required: "Please enter Answer ",
                      // pattern: {
                      //   value: characterRegex,
                      //   message: 'Allow Only 100 Character'
                      // }
                    })}
                    // invalid={errors.answer ? true : false}
                    {...field}
                  />
                )}
              />
              {errors && errors.answer && (
                <div style={{ color: "orangered", fontSize:'17px' }}>
                  {errors.answer.message}
                </div>
              )}
            </div>
          </Col>

          <Col xs={12} className="addModal__content--footer">
            <Button className="addModal__content--footer-btn" type="submit">
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
