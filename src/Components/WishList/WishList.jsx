import React, { useContext, useState } from "react";
import styles from "./WishList.module.css";
import { Helmet } from "react-helmet";
import { WishListContext } from "../../context/WishListContext";
import { useQuery } from "react-query";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { cartContext } from "../../context/CartContext";

export default function WishList() {
  let { getLoggedWishList, removeFromWishList } = useContext(WishListContext);
  let { postToCart } = useContext(cartContext);
  let [loading, setLoading] = useState(false);

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

  // ! remove From WishList
  async function removeAndRefetch(prodId) {
    setLoading(true);
    await removeFromWishList(prodId);
    await getLoggedWishList();
    refetch();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  // ! get logged wish list with use query
  function getLoggedList() {
    return getLoggedWishList();
  }

  let { isLoading, isError, data, isFetching, refetch } = useQuery(
    "getWishList",
    getLoggedList,
    {
      cacheTime: 10,
      refetchInterval: 200,
    }
  );
  // console.log(data?.data.data);
  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div className="container bg-main-light mt-5 p-4 rounded-4">
        <h2 className="fw-bold mb-5">My wish List</h2>
        {isLoading || loading ? (
          <div className="w-100 py-5 d-flex justify-content-center align-items-center">
            <PropagateLoader color="#515151" speedMultiplier={1.5} />
          </div>
        ) : (
          data?.data.data.map((product) => {
            return (
              <>
                <div key={product._id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <div className="frame w-25 ">
                        <img src={product.imageCover} className="w-75" alt="" />
                      </div>
                      <div className="fw-bold d-flex justify-content-center flex-column">
                        <p>{product.title}</p>
                        <p>{product.price} EGP</p>
                        <div
                          onClick={() => {
                            removeAndRefetch(product._id);
                          }}
                          className="cursor-pointer text-danger"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                          remove
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product._id);
                      }}
                      className="d-block fw-bold add-remove h-25"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <hr className="bg-main-light my-4" />
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
}
