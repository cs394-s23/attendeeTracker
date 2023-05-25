import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard.jsx";
import NavBar from "./NavBar.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/Create.css";
import { pushDb } from "../utilities/firebase";
import {
  trySampleRequest,
  saveToken,
  oauth2SignIn,
} from "../utilities/googleFormApi";
const Create = (data) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/home";
    navigate(path);
  };

  data = data.data;
  // Parse query string to see if page request is coming from OAuth 2.0 server.

  // If there's an access token, try an API request.
  // Otherwise, start OAuth 2.0 flow.

  const test = (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    var form = formDataObj.form;
    var user = JSON.parse(localStorage.getItem("oauth2-test-params"))[
      "user_id"
    ];

    var inDatabase = data.hasOwnProperty(user);
    console.log(inDatabase);
    if (inDatabase == false) {
      console.log("in database is null");
      trySampleRequest(form, true, null, false);
    } else trySampleRequest(form, true, null, true);
    routeChange();
  };

  // if (saveToken() == true) {
  //   console.log("logged in");
  return (
    <div>
      <NavBar />
      <Form id="form" onSubmit={test}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Forms ID</Form.Label>
          <Form.Control name="form" placeholder="Enter Forms ID" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
  // } else {
  //   oauth2SignIn();
  // }
};

export default Create;
