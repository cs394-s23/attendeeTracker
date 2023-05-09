import "../styles/NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
  
  return (
    <Navbar bg="light" expand="lg" className="navigation">
      <Container className="nav-container">
        <Navbar.Brand href="/#">OnSite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto special">
            <div className="left-navbar">
              <Nav.Link href="/#" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link
                href="/discover/"
                className="nav-link"
                data-cy="Discovery"
              >
                Discover
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
