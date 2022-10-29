/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { toast } from "react-toastify";
import { Item } from "./components/item-list"
export default function Home() {

  const onClickHandler = (event) => {
    event.preventDefault();
    localStorage.removeItem("access_token");
    toast.success("Logout !", {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div>
        <div className="w-full text-center">
          <button
            onClick={(event) => {
              onClickHandler(event);
            }}
            className="py-3 w-64 text-xl text-black outline-none bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
          >
            Log out
          </button>
        </div>
        <Item></Item>
      </div>
    </>
  );
}
