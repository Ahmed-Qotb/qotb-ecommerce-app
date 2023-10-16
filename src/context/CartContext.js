import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
  let [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(null);

  let headers = {
    token: localStorage.getItem("user token"),
  };

  //  ! post user cart
  function postToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  // ! get LoggedCart cart
  function getLoggedCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async function getCartId() {
    let { data } = await getLoggedCart()
    // console.log(data?.data._id);
    setCartId(data?.data._id)
  }

  useEffect(() => {
    getCartId()

  }, []);

  return (
    <cartContext.Provider
      value={{ cartId, postToCart, getLoggedCart, setLoading, loading }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
