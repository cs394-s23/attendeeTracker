// import "../styles/NavBar.css";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useEffect } from "react";

const NavBar = () => {
  const [signedIn, setSignedIn] = useState(localStorage.getItem("signedIn"));

  const signOut = (e) => {
    localStorage.removeItem("signedIn");
    localStorage.removeItem("oauth2-test-params");
    console.log("hi");
  };

  if (signedIn)
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">AttendeeTracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/create">Add Event</Nav.Link>
              <Nav.Link href="/" onClick={signOut}>
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  else
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">AttendeeTracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/">Add Event</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NavBar;
