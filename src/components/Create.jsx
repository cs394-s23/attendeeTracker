import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard.jsx";
import NavBar from "./NavBar.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/Create.css";
import { pushDb } from "../utilities/firebase";
import { trySampleRequest, saveToken } from "../utilities/googleFormApi";
const Create = () => {


  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  // Parse query string to see if page request is coming from OAuth 2.0 server.

  // If there's an access token, try an API request.
  // Otherwise, start OAuth 2.0 flow.

  const test = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log("wait what " + e);

    var form = formDataObj.form;
    trySampleRequest(form, true);
    routeChange();
  };

 saveToken()

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
};

export default Create;
