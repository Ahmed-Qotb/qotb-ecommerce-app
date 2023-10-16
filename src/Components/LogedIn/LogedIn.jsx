import React from "react";
import styles from "./LogedIn.module.css";
import { Navigate } from "react-router-dom";

export default function LogedIn(props) {
  if (localStorage.getItem("user token") !== null) {
    return <Navigate to={"/Home"} />;
  } else {
    return props.children;
  }
}
