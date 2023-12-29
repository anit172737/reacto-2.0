import React, { useEffect, useState } from "react";
import img1 from "../../assets/images/1.png";
import "../../sass/pages/public/login.scss";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../utility/utils";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { SignUpApi } from "../../services/apiEndpoints";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    reset,
    control,
    setError,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(baseUrl + SignUpApi, data);
      if (!response.data.error) {
        toast.success(response.data.message, { duration: 1000 });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        navigate("/signup");
        toast.error(response.data.error, { duration: 1000 });
      }
    } catch (error) {
      //   toast.error(error.response.data.error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="form">
      <div className="form__container">
        <div className="form__container__left">
          <img
            className="form__container__left-img"
            src={img1}
            alt="login-img"
          ></img>
        </div>

        <div className="form__container__right">
          <form
            className="form__container__right-sec"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="form__container__right-heading">Register</h1>
            <div>
              <Controller
                id="email"
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    className="form__container__right-input"
                    type="email"
                    placeholder="Enter Email"
                    {...register("email", {
                      required: "Please enter email address",
                      pattern: {
                        value: emailRegex,
                        message: "Please enter valid email address",
                      },
                    })}
                    {...field}
                  />
                )}
              />
              {errors && errors.email && (
                <div style={{ fontSize: "18px", color: "orangered" }}>
                  {errors.email.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                id="password"
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    className="form__container__right-input"
                    type="password"
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Please enter password",
                      pattern: {
                        value: passwordRegex,
                        message: "Please enter valid password",
                      },
                    })}
                    {...field}
                  />
                )}
              />
              <p className="form__container__p">
                (Password between 8 to 15 characters which contain alteast one
                uppercase letter, one lowercase letter, one special character
                and one numeric digit. )
              </p>
              {errors && errors.password && (
                <div className="form__container__error">
                  {errors.password.message}
                </div>
              )}
            </div>
            <input
              className="form__container__right-btn"
              type="submit"
              value="Register"
            />
          </form>
          <div className="form__container__sign">
            Already registered?
            <button
              className="form__container__sign-btn"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
