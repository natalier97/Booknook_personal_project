import { Link, useNavigate, useOutletContext } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { userLogout } from "../utilities";

//bootstrap stuff
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar({ user, setUser, searchValue, setSearchValue }) {
  let navigate = useNavigate();

  function handleInput(event) {
    setSearchValue(event.target.value);
  }

  function navigateToSearchPage() {
    let route = `/searchresults/${searchValue}/`;
    navigate(route);
    setSearchValue("");
  }

  async function handleUserLogout() {
    let loggedOut = await userLogout();
    //true or false will be returned
    if (loggedOut) {
      setUser(null);
    }
  }

  return (
    <nav style={{ height: "5vh" }}>
      <Navbar
        id="navbar"
         style={{ position: "fixed", width: "100%" }}
        sticky="top"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            BookNook
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/homePage/">
                Home :){" "}
              </Nav.Link>

              <Nav.Link href="#action2">
                {user ? user.user : "Sign Up/Log In"}{" "}
              </Nav.Link>
              <NavDropdown title="" id="navbarScrollingDropdown">
                {user ? null : (
                  <Nav.Link as={Link} to="/">
                    Log In / Sign Up
                  </Nav.Link>
                )}
                {!user ? null : (
                  <NavDropdown.Item onClick={() => handleUserLogout()}>
                    Log Out
                  </NavDropdown.Item>
                )}
                {/* <NavDropdown.Item href="#action3">cat </NavDropdown.Item>
                <NavDropdown.Item href="#action4">dog</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item> */}
              </NavDropdown>
              {user ? (
                <Nav.Link as={Link} to="/myBooksPage/:shelfName/">
                  My Books
                </Nav.Link>
              ) : null}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleInput}
                value={searchValue}
              />
              <Button variant="outline-light" onClick={navigateToSearchPage}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}

export default NavBar;
