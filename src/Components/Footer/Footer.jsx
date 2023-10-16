import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <section className="bg-main-light py-5 mt-5 position-static bottom-0">
        <div className="container">
          <p className="h4">Get the Fresh Cart App</p>
          <p className="text-muted">
            we will send you a link open it on your phone
          </p>
          <div className="d-flex">
            <input
              type="email"
              placeholder="Email.."
              className="form-control me-3 w-75"
            />
            <button className="bg-main btn text-white px-5">share app link</button>
          </div>
        <hr className="bg-main-light my-5"/>
        </div>
      </section>
    </>
  );
}
