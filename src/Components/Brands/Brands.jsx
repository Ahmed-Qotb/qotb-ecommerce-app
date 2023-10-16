import React from "react";
import styles from "./Brands.module.css";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import { PropagateLoader } from "react-spinners";

export default function Brands() {
  // ! brands api
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { isLoading, isError, data, isFetching } = useQuery("brnds", getBrands);
  // console.log(data?.data.data);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center align-items-center vh-100">
          <PropagateLoader color="#515151" speedMultiplier={1.5} />
        </div>
      ) : (
        <div className="container mt-5">
          <h2 className="text-center text-main fw-bold">All Brands</h2>
          <div className="row mt-3 gy-4">
            {data?.data.data.map((brand) => {
              return (
                <div key={brand._id} className="col-md-3">
                  <div className="parent-brnds pb-3 border overflow-hidden rounded-3">
                    <div className="frame">
                      <img src={brand.image} className="w-100" alt="" />
                    </div>
                    <p className="text-center">{brand.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
