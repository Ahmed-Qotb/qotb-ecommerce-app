import React, { useContext, useState } from "react";
import styles from "./Address.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import * as yup from "yup";
import { cartContext } from "../../context/CartContext";

export default function Address() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const { cartId } = useContext(cartContext);

  let { userToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAddress(values) {
    console.log(values);
    console.log(userToken);

    setError(null);
    setIsLoading(true);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress: values },
        { headers: { token: userToken } }
      )
      .catch((err) => {
        console.log(err);
      });
    console.log(data?.session.url);

    if (data.message === "success") {
      setIsLoading(false);
    }
    window.location.href = data?.session.url;
  }

  let validationSchema = yup.object({
    details: yup.string().required("details is required"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(phoneRegExp, "phone number is envalid"),
    city: yup.string().required("city is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleAddress,
  });

  return (
    <>
      <div className="container w-75 mx-auto py-5 mt-5">
        <h2 className="py-5 fw-bold">Submit You'r Address</h2>

        <form action="" onSubmit={formik.handleSubmit}>
          <label htmlFor="details" className="fw-bold">
            Details :
          </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.details}
            type="details"
            id="details"
            name="details"
          />
          {formik.errors.Details && formik.touched.Details ? (
            <div className="alert alert-danger py-2">
              {formik.errors.Details}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone" className="fw-bold">
            Phone :
          </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="phone"
            id="phone"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger py-2">{formik.errors.phone}</div>
          ) : (
            ""
          )}

          <label htmlFor="city" className="fw-bold">
            city :
          </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-3"
            onChange={formik.handleChange}
            value={formik.values.city}
            type="city"
            id="city"
            name="city"
          />
          {formik.errors.city && formik.touched.city ? (
            <div className="alert alert-danger py-2">{formik.errors.city}</div>
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
              Pay Now
            </button>
          )}
        </form>
      </div>
    </>
  );
}
