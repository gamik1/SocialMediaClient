import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from 'react-bootstrap/Offcanvas';
//import { TbActivity } from "react-icons/tb";
import Logo from "../Logo.component/Logo.component";
import jwt from "jwt-decode";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { logoutCall } from "../../API/apiCalls";

import "./Navigation.component.css";

function Navigation() {
  const { user, dispatch } = useContext(AuthContext);
  let _id = "noUser";
  if (user) {
    const decoded = jwt(user.token);
    _id = decoded.user._id;
  }
  const handleLogout = () => {
    logoutCall(dispatch);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fliud>
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Nav className="d-flex text-dark" style={{ maxHeight: "100px" }} navbarScroll>
            {!user ? <Nav.Link className="text-dark fw-bold" href="/login">Login</Nav.Link> : ""}
            {!user ? <Nav.Link className="text-dark fw-bold" href="/register">Register</Nav.Link> : ""}
            {user ? <Nav.Link className="text-dark fw-bold" href="/user/home">Home</Nav.Link> : ""}
            {user ? <Nav.Link className="text-dark fw-bold" href="/user/profile">Profile</Nav.Link> : ""}
            {user ? (
              <Nav.Link
                className=".d-none .d-sm-block .d-md-none displayExtra text-dark fw-bold"
                href="/user/userlist"
              >
                Search Friends
              </Nav.Link>
            ) : (
              ""
            )}
            {user ? (
              <Nav.Link
                className=".d-none .d-sm-block .d-md-none displayExtra text-dark fw-bold"
                href="/user/events"
              >
                Events
              </Nav.Link>
            ) : (
              ""
            )}

            {user ? (
              <Nav.Link
                className=".d-none .d-sm-block .d-md-none displayExtra text-dark fw-bold"
                href="/user/donate"
              >
                Donate Us
              </Nav.Link>
            ) : (
              ""
            )}
            {user ? (
              <Nav.Link
                className=".d-none .d-sm-block .d-md-none displayExtra text-dark fw-bold"
                href="/user/news"
              >
                News
              </Nav.Link>
            ) : (
              ""
            )}
            {user ? <Nav.Link className="text-dark fw-bold"onClick={handleLogout}>Logout</Nav.Link> : ""}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation;
