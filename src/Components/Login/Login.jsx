import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { couterContext } from "../../context/CounterContext";
import axios, { Axios } from "axios";
import { json, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  // ? =======> validation with yup <=======

  let validationSchema = yup.object({
    email: yup.string().email("email is envalid").required("email is required"),

    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  // ? =======> formik <=======
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let { setUserToken } = useContext(UserContext);
  async function Login(values) {
    setError(null);
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
    console.log(data);

    if (data.message === "success") {
      navigate("/Home");
      setIsLoading(false);
      json(localStorage.setItem("user token", data.token));
      setUserToken(data.token);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: Login,
  });

  return (
    <>
        <Helmet>
      <title>Login</title>
    </Helmet>
      <div className="w-75 mx-auto py-5">
        <h2 className="py-5 fw-bold">Login Now</h2>

        <form action="" onSubmit={formik.handleSubmit}>
          {/* email */}
          <label htmlFor="email" className="fw-bold">
            Email :
          </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            id="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2">{formik.errors.email}</div>
          ) : (
            ""
          )}

          {/* password */}
          <label htmlFor="password" className="fw-bold">
            Password :
          </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            id="password"
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          {/* submit button */}
          <div>
            {error ? (
              <span className="alert alert-danger py-2">{error}</span>
            ) : (
              ""
            )}
            {isLoading ? (
              <button
                className="btn bg-main text-white mt-2 d-block ms-auto "
                type="submit"
              >
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                className="btn bg-main text-white mt-2 d-block ms-auto"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
