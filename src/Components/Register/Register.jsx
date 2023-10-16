import React, { useContext, useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { couterContext } from "../../context/CounterContext";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  // ? =======> validation with yup <=======
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("name is required"),
    email: yup.string().email("email is envalid").required("email is required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "phone number is envalid")
      .required("phone number is required"),

    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "password or repassword are not matching")
      .required("repassword is required"),
  });

  // ? =======> formik <=======
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function Register(values) {
    setError(null);
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
    console.log(data);

    if (data.message === "success") {
      navigate("/Login");
      setIsLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: Register,
  });

  return (
    <>
        <Helmet>
      <title>Register</title>
    </Helmet>
      <div className="w-75 mx-auto py-5">
        <h2 className="py-5 fw-bold">Rigister Now</h2>

        <form action="" onSubmit={formik.handleSubmit}>
          {/* name */}
          <label htmlFor="name" className="fw-bold">
            Name :
          </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            id="name"
            name="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger py-2">{formik.errors.name}</div>
          ) : (
            ""
          )}

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

          {/* phone */}
          <label htmlFor="phone" className="fw-bold">
            Phone :
          </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            id="phone"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger py-2">{formik.errors.phone}</div>
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

          {/* rePassword */}
          <label htmlFor="rePassword" className="fw-bold">
            rePassword :
          </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            id="rePassword"
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger py-2">
              {formik.errors.rePassword}
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
                Rigister
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
