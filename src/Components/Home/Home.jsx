import React from "react";
import styles from "./Home.module.css";
import Slider from "react-slick";
import slider1 from "../../Assets/images/slider01.jpg";
import slider2 from "../../Assets/images/slider02.jpg";
import slider3 from "../../Assets/images/slider03.jpg";
// import slider4 from "../../Assets/images/slider04.jpg";
// import slider5 from "../../Assets/images/slider05.jpg";
import axios from "axios";
import { useQuery } from "react-query";
import { PropagateLoader } from "react-spinners";
import Products from "../Products/Products";
import { Helmet } from "react-helmet";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const main = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
  };

  async function getCat() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { isLoading, isError, data, isFetching } = useQuery("getCat", getCat);
  // console.log(data?.data.data);
  return (
    <>
        <Helmet>
      <title>Home</title>
    </Helmet>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center align-items-center vh-100">
          <PropagateLoader color="#515151" speedMultiplier={1.5} />
        </div>
      ) : (
        <>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-3">
                <div className="mainSlider w-100">
                  <Slider {...settings}>
                    <div>
                      <img src={slider1} className="w-100 m-auto" alt="" />
                    </div>
                    <div>
                      <img src={slider3} className="w-100 m-auto" alt="" />
                    </div>
                    <div>
                      <img src={slider2} className="w-100 m-auto" alt="" />
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="col-md-3">
                <div className="">
                  <img src="https://routeegy.github.io/Ecommerce/assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg" className="w-100" alt="" />
                </div>
                <div className="">
                  <img src="https://routeegy.github.io/Ecommerce/assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg" className="w-100" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="frame my-4">
            <Slider {...main}>
              {data?.data.data.map((cat,i) => {
                return (
                  <div key={i}>
                    <img
                      src={cat.image}
                      height={300}
                      className="w-100"
                      alt={cat.name}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
          <Products />
        </>
      )}
    </>
  );
}
