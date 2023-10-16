import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../context/UserContext";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("user token");
    setUserToken(null);
    navigate("/Login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light position-fixed start-0 end-0 z-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh cart" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav m-auto mt-2 mt-lg-0">
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/Home"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/Cart"
                      aria-current="page"
                    >
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/wishList"
                      aria-current="page"
                    >
                      Wish List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/products"
                      aria-current="page"
                    >
                      products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/Categories"
                      aria-current="page"
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/Brands"
                      aria-current="page"
                    >
                      Brands
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <span
                      onClick={() => {
                        logOut();
                      }}
                      className="nav-link active cursor-pointer"
                    >
                      Logout{" "}
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/Login"
                      aria-current="page"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/Register"
                      aria-current="page"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
