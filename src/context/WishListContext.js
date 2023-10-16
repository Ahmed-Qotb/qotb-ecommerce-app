import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishListContext = createContext();

export function WishListContextProvider(props) {
    let headers = {
        token: localStorage.getItem("user token"),
    };

    //  ! post user WishList
    function postToWishList(productId) {
        return axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
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

    // ! get LoggedWishList
    function getLoggedWishList() {
        return axios
            .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: headers,
            })
            .then((response) => response)
            .catch((error) => error);
    }

    // ! remove from Wishlist

    function removeFromWishList(prodId) {
        return axios
            .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, {
                headers: headers,
            })
            .then((response) => response)
            .catch((error) => error);
    }


    return (
        <WishListContext.Provider
            value={{ postToWishList, getLoggedWishList, removeFromWishList }}
        >
            {props.children}
        </WishListContext.Provider>
    );
}