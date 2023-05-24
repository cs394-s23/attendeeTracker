import NavBar from "./NavBar";
import Event from "./Event";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";


import {
  saveToken,
  oauth2SignIn,
  getUserInfo,
} from "../utilities/googleFormApi";
import Button from "react-bootstrap/Button";

const SignIn = ({}) => {
  const [signedIn, setSignedIn] = useState(localStorage.getItem("signedIn"));

  //   console.log(signedIn);
  //   setSignedIn(localStorage.getItem("signedIn"));
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/home";
    navigate(path);
  };

  const onClickNotSigned = (e) => {
    e.preventDefault();
    oauth2SignIn();
    localStorage.setItem("signedIn", true);
    console.log("hi");
  };

  const onClickSigned = (e) => {
    saveToken();
    routeChange();
  };

  console.log(signedIn);
  console.log("not logged in save token");
  if (!signedIn || signedIn == false) {
    return (
      <div>
        <NavBar />
        <h1 id="header"> Sign in to view your events </h1>
        <Button id="sign-in" onClick={onClickNotSigned}>
          {" "}
          Sign In{" "}
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <h1 id="header"> Continue to your events </h1>
        <Button id="sign-in" onClick={onClickSigned}>
          {" "}
          Continue{" "}
        </Button>
      </div>
    );
  }
};

export default SignIn;
