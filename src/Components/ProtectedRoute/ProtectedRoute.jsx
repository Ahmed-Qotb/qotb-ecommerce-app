import React from "react";
import styles from "./ProtectedRoute.module.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("user token") !== null) {
    return props.children;
  } else {
    return <Navigate to={"/Login"} />;
  }
}
