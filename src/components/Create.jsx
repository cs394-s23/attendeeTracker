import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard.jsx";
import NavBar from "./NavBar.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/Create.css";
import { pushDb } from "../utilities/firebase";
const Create = () => {
  var YOUR_CLIENT_ID =
    "830241005429-o7l0fqrcdqp9ef44qc8upa6j3510vbvr.apps.googleusercontent.com";
  var YOUR_REDIRECT_URI = "http://localhost:5173";
  var fragmentString = location.hash.substring(1);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
  // Parse query string to see if page request is coming from OAuth 2.0 server.

  // If there's an access token, try an API request.
  // Otherwise, start OAuth 2.0 flow.

  const parseResponse = (e) => {
    e = JSON.parse(e);
    var data = {};
    var going = {};
    going["attending"] = 3; //hardcoded till we get a good way of data collection
    going["no_response"] = 76;
    going["not_attending"] = 5;
    data["name"] = e["info"]["title"];
    data["details"] = e.info.description;
    data["host"] = e.items[1].description;
    data["time"] = e.items[0].description;
    data["count"] = going;

    console.log(data);
    pushDb(data, "Events/");
    routeChange();
  };

  const test = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    var form = formDataObj.form;
    trySampleRequest(form, true);
  };

  const trySampleRequest = (form, responsesOrForm) => {
    var params = JSON.parse(localStorage.getItem("oauth2-test-params"));
    if (params && params["access_token"]) {
      var xhr = new XMLHttpRequest();
      var responses = "?";
      if (responsesOrForm == false) {
        responses = "/repsonses?";
      }
      console.log(params);
      xhr.open(
        "GET",
        "https://forms.googleapis.com/v1/forms/" +
          form +
          responses +
          //"https://www.googleapis.com/drive/v3/about?fields=user&" +
          "access_token=" +
          params["access_token"]
      );
      xhr.onreadystatechange = function (i) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          //   console.log(xhr.response);
          parseResponse(xhr.response);
        } else if (xhr.readyState === 4 && xhr.status === 403) {
          // Token invalid, so prompt for user permission.
          oauth2SignIn();
        } else if (xhr.readyState === 4 && xhr.status === 401) {
          // Token invalid, so prompt for user permission.
          oauth2SignIn();
        }
      };
      xhr.send(null);
    } else {
      oauth2SignIn();
    }
  };

  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */
  function oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: YOUR_CLIENT_ID,
      redirect_uri: YOUR_REDIRECT_URI,
      scope: "https://www.googleapis.com/auth/drive",
      state: "try_sample_request",
      include_granted_scopes: "true",
      response_type: "token",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

  var params = {};
  var regex = /([^&=]+)=([^&]*)/g,
    m;
  while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem("oauth2-test-params", JSON.stringify(params));
    if (params["state"] && params["state"] == "try_sample_request") {
      console.log("hi");
      trySampleRequest();
    }
  }

  return (
    <div>
      <NavBar />
      <Form id="form" onSubmit={(e) => test(e)}>
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
