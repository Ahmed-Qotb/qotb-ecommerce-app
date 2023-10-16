import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import axios from "axios";
import { cartContext } from "../../context/CartContext";
import { useQuery } from "react-query";
import { PropagateLoader } from "react-spinners";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet"

export default function Cart() {
  let { userToken, setUserToken } = useContext(UserContext);

  // ! loading vriable
  let [loading, setLoading] = useState(false);

  // !cart context
  let { postToCart, getLoggedCart } = useContext(cartContext);


  async function getUserCart() {
    return await getLoggedCart();
  }

  // !remove product from cart

  function removeAndRefetch(prodId) {
    removeFromCart(prodId);
    getLoggedCart();
    refetch();
  }

  async function removeFromCart(prodId) {
    setLoading(true);

    let response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
      {
        headers: {
          token: userToken,
        },
      }
    );

    // console.log(response);
    getLoggedCart();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  // !remove all products fom cart
  async function clearCart() {
    setLoading(true);

    let response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: userToken,
        },
      }
    );
    refetch();

    // console.log(response);
    getLoggedCart();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  // ! update product count
  async function changeCartQuant(prodId, count) {
    setLoading(true);

    let response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
      { count },
      {
        headers: {
          token: userToken,
        },
      }
    );
    refetch();

    // console.log(response);
    getUserCart();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  // ! get cart use query
  let { isLoading, isError, data, isFetching, refetch } = useQuery(
    "logged cart",
    getUserCart,
    {
      cacheTime: 10,
      refetchInterval: 200,
    }
  );
  // console.log(data, isLoading);

  // ! check out api


  return (
    <>
    <Helmet>
      <title>Cart</title>
    </Helmet>
      {loading ? (
        <div className="w-100 py-5 d-flex justify-content-center align-items-center vh-100">
          <PropagateLoader color="#515151" speedMultiplier={1.5} />
        </div>
      ) : (
        <>
          <div className="mt-5 container bg-main-light py-5 px-5 rounded">
            <div className="d-flex justify-content-between">
              <div>
                <p className="h3 fw-bold">Cart Shop</p>
                <p className="fw-bolder mt-4">
                  total price:{" "}
                  <span className=" text-main">
                    {data?.statusText === "OK"
                      ? data?.data.data.totalCartPrice
                      : 0}
                  </span>
                </p>
              </div>
              <div>
                <Link to={"/address"} className="btn bg-blue text-white fw-bold d-block ms-auto">
                  check out
                </Link>
                <p className="fw-bolder mt-4">
                  total number of items:{" "}
                  <span className=" text-main">
                    {data?.statusText === "OK" ? data?.data.numOfCartItems : 0}
                  </span>
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="w-100 py-5 d-flex justify-content-center align-items-center">
                <PropagateLoader color="#515151" speedMultiplier={1.5} />
              </div>
            ) : data?.statusText === "OK" ? (
              data.data.data.products.map((product) => {
                return (
                  <div key={product.product._id}>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <div className="frame w-25 ">
                          <img
                            src={product.product.imageCover}
                            className="w-75"
                            alt=""
                          />
                        </div>
                        <div className="fw-bold d-flex justify-content-center flex-column">
                          <p>{product.product.title}</p>
                          <p>{product.price} EGP</p>
                          <div
                            onClick={() =>
                              removeAndRefetch(product.product._id)
                            }
                            className="cursor-pointer text-danger"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                            remove
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center">
                        <i
                          onClick={() =>
                            changeCartQuant(
                              product.product._id,
                              product.count + 1
                            )
                          }
                          className="add-remove fa-solid fa-plus"
                        ></i>
                        <span className="mx-4">
                          {product.count < 1
                            ? removeAndRefetch(product.product._id)
                            : product.count}
                        </span>
                        <i
                          onClick={() =>
                            changeCartQuant(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          className="add-remove fa-solid fa-minus"
                        ></i>
                      </div>
                    </div>
                    <hr className="bg-main-light my-4" />
                  </div>
                );
              })
            ) : (
              ""
            )}

            <button
              onClick={() => clearCart()}
              className="d-block m-auto fw-bold add-remove"
            >
              Clear Your Cart
            </button>
          </div>
        </>
      )}
    </>
  );
}
