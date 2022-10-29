import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login(props) {
  const [loginForm, setLoginform] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (label, event) => {
    switch (label) {
      case "email":
        setLoginform({ ...loginForm, email: event.target.value });
        break;
      case "password":
        setLoginform({ ...loginForm, password: event.target.value });
        break;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(loginForm);
    // call api login
    await axios
      .post("http://localhost:8000/login", loginForm)
      .then((response) => {
        console.log(response);
        // Save token to local storage
        localStorage.setItem("access_token", response.data.access_token);
        console.log(response.data.access_token);
        // add successfully notif
        toast.success(response.data.detail);
        // reload page after success login
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // add error notif
        
        console.log(error);
        toast.error(error.response.data.detail);
      });
  };

  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Welcome
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
          Please login to your account!
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => {
              onChangeForm("email", event);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => {
              onChangeForm("password", event);
            }}
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none"
          >
            Sign In
          </button>
          <p className="mt-4 text-sm">
            You don't have an account?{" "}
            <Link
              to="/register"
              onClick={() => {
                props.setPage("register");
              }}
            >
              <span className="underline cursor-pointer">Register</span>
            </Link>{" "}
          </p>
        </div>
      </form>
    </React.Fragment>
  );
}
