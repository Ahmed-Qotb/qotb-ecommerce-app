import React, { useContext, useEffect, useState } from "react";
import styles from "./Products.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { PropagateLoader } from "react-spinners";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { WishListContext } from "../../context/WishListContext";

export default function Products() {
  // ! use state to store data and contexts
  const [products, setProducts] = useState([]);
  let { postToCart } = useContext(cartContext);
  let { postToWishList } = useContext(WishListContext);

  // ! add to wishlist
  async function postToList(productId) {
    let response = await postToWishList(productId);
    console.log(response);
    // ! hot toast
    if (response.data.status === "success") {
      toast.success("product is added to WishList", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "tomato",
          color: "white",
        },
      });
    } else {
      toast.error("product is added to cart", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "red",
          color: "black",
        },
      });
    }
  }


  // ! add to cart functiom
  async function addToCart(productId) {
    let response = await postToCart(productId);
    // console.log(response);
    // ! hot toast
    if (response.data.status === "success") {
      toast.success("product is added to cart", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "green",
          color: "white",
        },
      });
    } else {
      toast.error("product is added to cart", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "red",
          color: "black",
        },
      });
    }
  }

  // ! get all products api
  async function getProducts() {
    // let { data } = await axios.get(
    //   `https://ecommerce.routemisr.com/api/v1/products`
    // );
    // console.log(data.data);
    // setProducts(data.data);
    // // console.log(products);

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, isError, data, isFetching } = useQuery(
    "allProducts",
    getProducts,
    {
      isFetching: 200,
    }
  );
  // console.log(isLoading, data?.data.data);
  // ! get specific product api

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center align-items-center vh-100">
          <PropagateLoader color="#515151" speedMultiplier={1.5} />
        </div>
      ) : (
        <div className="mt-5">
          <div className="container">
            <input
              type="text"
              className="my-5 form-control w-75 m-auto"
              placeholder="search.."
            />
            <div className="row gy-3">
              {data?.data.data.map((product) => {
                return (
                  <div className="col-md-3" key={product._id}>
                    <div className="product rounded cursor-pointer px-2 py-4">
                      <Link to={`/ProductDetails/${product._id}`}>
                        <div className="frame">
                          <img
                            src={product.imageCover}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="words">
                          <p className="text-main">{product.category.name}</p>
                          <p className="fw-bold">
                            {product.title.split(" ").slice(0, 2).join(" ")}
                          </p>
                          <div className="d-flex justify-content-between">
                            <span className="fw-semibold">
                              {product.price} EGP
                            </span>
                            <span className="fw-semibold">
                              <i className="fa-solid fa-star rating-color"></i>
                              {product.ratingsAverage}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="d-flex justify-content-end me-2">
                        <i
                          onClick={() => {
                            postToList(product._id);
                          }}
                          className="fa-solid fa-heart fa-2x cursor-pointer"
                        ></i>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div
                          onClick={() => {
                            addToCart(product._id);
                          }}
                          className="btn bg-main text-white px-5"
                        >
                          +Add
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
