import NavBar from "./NavBar";
import Event from "./Event";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { notSignedIn } from "../utilities/googleFormApi";

import {
  saveToken,
  oauth2SignIn,
  getUserInfo,
} from "../utilities/googleFormApi";
import Button from "react-bootstrap/Button";

const SignIn = ({}) => {
  const [signedIn, setSignedIn] = useState(localStorage.getItem("signedIn"));

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/home";
    navigate(path);
  };

  const onClickNotSigned = (e) => {
    localStorage.setItem("signedIn", true);
    // console.log("hi");
    window.location.reload(true);
    // e.preventDefault();
    oauth2SignIn();
  };

  const onClickSigned = (e) => {
    saveToken().then((signIn) => {
      console.log(signIn);
      routeChange();
    });
  };

  console.log("hi " + localStorage.getItem("signedIn"));

  //   console.log("not logged in save token");
  if (notSignedIn()) {
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
