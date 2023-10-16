import React, { useState } from "react";
import styles from "./Categories.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { PropagateLoader } from "react-spinners";

export default function Categories() {
  // ! sub cat api = https://ecommerce.routemisr.com/api/v1/categories/6439d2d167d9aa4ca970649f/subcategories

  let [subCatArr, setSubCatArr] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getSubCat(catId) {
    setLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`
    );
    // console.log(data?.data[0].name);
    setSubCatArr(data?.data);
    setLoading(false);
  }

  // ! get category api
  function getCatApi() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { isLoading, isError, data, isFetching } = useQuery(
    "categories",
    getCatApi
  );
  // console.log(data?.data.data);
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center align-items-center vh-100">
          <PropagateLoader color="#515151" speedMultiplier={1.5} />
        </div>
      ) : (
        <div className="container mt-5">
          <h2 className="text-center text-main fw-bold">All Categories</h2>
          <div className="row mt-3 gy-4">
            {data?.data.data.map((cat) => {
              return (
                <div key={cat._id} className="col-md-4">
                  <div
                    onClick={() => {
                      getSubCat(cat._id);
                    }}
                    className="parent-brnds overflow-hidden rounded-3 border"
                  >
                    <div className="frame position-relative">
                      <img src={cat.image} className="catImg w-100" alt="" />
                      <div className="bg-white py-3 brand-title position-absolute bottom-0 start-0 end-0">
                        <h3 className="text-center text-main fw-bold">
                          {cat.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row gy-4 mt-5">
            {loading ? (
              <div className="w-100 py-5 d-flex justify-content-center align-items-center">
                <PropagateLoader color="#515151" speedMultiplier={1.5} />
              </div>
            ) : subCatArr == [] ? (
              ""
            ) : (
              subCatArr.map((subcat) => {
                return (
                  <div key={subcat._id} className="col-md-4">
                    <div className="parent-brnds py-3 overflow-hidden rounded-3">
                      <h3 className="text-center">{subcat.name}</h3>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
}
