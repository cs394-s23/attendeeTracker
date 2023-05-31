// import "../styles/NavBar.css";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useEffect } from "react";

const NavBar = () => {
  const [signedIn, setSignedIn] = useState(
    localStorage.getItem("oauth2-test-params")
  );

  const signOut = (e) => {
    localStorage.removeItem("signedIn");
    localStorage.removeItem("oauth2-test-params");
    // console.log("hi");
  };

  if (signedIn)
    return (
      <nav
        className="w-full flex items-center py-4 fixed top-0 z-20 px-6"
        style={{
          backgroundColor: "#48b96f",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Nav.Link href="/home">
          <div
            className="flex items-center justify-between w-full max-w-7xl mx-auto"
            style={{
              display: "flex",
              alignItems: "flex-start",
              paddingLeft: 40,
            }}
          >
            <img
              src="/logo-white.png"
              alt="logo"
              className="w-9 h-9 object-contain"
              style={{ width: 200 }}
            />{" "}
            {/* roughly size 58 */}
            {/* <h1 className="title" style={{ fontFamily: "mont-semibold", fontSize: 30, color: "white", marginTop: 10, marginLeft: 40}}> Attendee Tracker</h1> */}
          </div>
        </Nav.Link>

        <div style={{ marginLeft: 50, marginTop: 7, display: "flex" }}>
          <Nav.Link href="/home">
            <h3 style={{ fontSize: 20, color: "white", marginRight: 20 }}>
              Home
            </h3>
          </Nav.Link>

          <Nav.Link href="/create">
            <h3 style={{ fontSize: 20, color: "white" }}>Add Event</h3>
          </Nav.Link>

          {signedIn ? (
            <Nav.Link href="/" onClick={signOut}>
              <h3 style={{ fontSize: 20, color: "white", marginLeft: 20 }}>
                Sign Out
              </h3>
            </Nav.Link>
          ) : (
            <Nav.Link href="/">
              <h3 style={{ fontSize: 20, color: "white", marginLeft: 20 }}>
                Sign In
              </h3>
            </Nav.Link>
          )}
        </div>
      </nav>
    );
  else
    return (
      <nav
        className="w-full flex items-center py-4 fixed top-0 z-20 px-6"
        style={{
          backgroundColor: "#48b96f",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Nav.Link href="/">
          <div
            className="flex items-center justify-between w-full max-w-7xl mx-auto"
            style={{
              display: "flex",
              alignItems: "flex-start",
              paddingLeft: 40,
            }}
          >
            <img
              src="/logo-white.png"
              alt="logo"
              className="w-9 h-9 object-contain"
              style={{ width: 200 }}
            />{" "}
            {/* roughly size 58 */}
            {/* <h1 className="title" style={{ fontFamily: "mont-semibold", fontSize: 30, color: "white", marginTop: 10, marginLeft: 40}}> Attendee Tracker</h1> */}
          </div>
        </Nav.Link>

        <div style={{ marginLeft: 50, marginTop: 7, display: "flex" }}>
          <Nav.Link href="">
            <h3 style={{ fontSize: 20, color: "white", marginRight: 20 }}>
              Home
            </h3>
          </Nav.Link>

          <Nav.Link href="">
            <h3 style={{ fontSize: 20, color: "white" }}>Add Event</h3>
          </Nav.Link>

          {signedIn ? (
            <Nav.Link href="" onClick={signOut}>
              <h3 style={{ fontSize: 20, color: "white", marginLeft: 20 }}>
                Sign Out
              </h3>
            </Nav.Link>
          ) : (
            <Nav.Link href="">
              <h3 style={{ fontSize: 20, color: "white", marginLeft: 20 }}>
                Sign In
              </h3>
            </Nav.Link>
          )}
        </div>
      </nav>
    );
};

export default NavBar;
