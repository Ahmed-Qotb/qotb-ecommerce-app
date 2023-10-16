import React, { useContext } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { PropagateLoader } from "react-spinners";
import Slider from "react-slick";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../context/WishListContext";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let { postToCart } = useContext(cartContext);
  let { postToWishList } = useContext(WishListContext);
  // ! add to wishlist
  async function postToList(productId) {
    let response = await postToWishList(productId);
    console.log(response);
    // ! hot toast
    if (response?.data.status === "success") {
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
    console.log(response);
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { id } = useParams();
  // console.log(id);

  // ! get Specific Product api
  function getSpecificProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { isLoading, isError, data } = useQuery(
    "SpecificProduct",
    getSpecificProduct,
    {
      cacheTime: 10,
    }
  );
  // console.log(data?.data.data);
  return (
    <>
      <Helmet>
        <title>{data?.data.data.title}</title>
      </Helmet>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center align-items-center vh-100">
          <PropagateLoader color="#515151" speedMultiplier={1.5} />
        </div>
      ) : (
        <div className="mt-5 rounder mx-3 py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="frame">
                  <div>
                    <Slider {...settings}>
                      {data?.data.data.images.map((img, i) => {
                        return (
                          <img key={i} src={img} className="w-100" alt="" />
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="parent d-flex justify-content-center h-100 flex-column">
                  <p className="fw-bold h3">{data?.data.data.title}</p>
                  <p className="text-muted mt-4">
                    {data?.data.data.description}
                  </p>
                  <div className="d-flex justify-content-between">
                    <span>{data?.data.data.price} EGP</span>
                    <span>
                      {data?.data.data.ratingsAverage}
                      <i className="fa-solid fa-star rating-color"></i>
                    </span>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <button
                      onClick={() => {
                        addToCart(id);
                      }}
                      className="btn bg-main text-white w-75 me-5"
                    >
                      + Add
                    </button>
                    <i
                      onClick={() => {
                        postToList(id);
                      }}
                      className="cursor-pointer ms-5 fa-solid fa-heart fa-2x text-main-dark"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
