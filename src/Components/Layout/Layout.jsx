import React, { useContext, useEffect } from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { UserContext } from "../../context/UserContext";
export default function Layout() {
  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("user token") !== null) {
      setUserToken(localStorage.getItem("user token"));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-5">
        <Outlet></Outlet>
      </div>

      <Footer />
    </>
  );
}
