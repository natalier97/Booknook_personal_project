import { Link, useNavigate } from "react-router-dom";
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

function NavBar({user, setUser}) {

  async function handleUserLogout(){
    let loggedOut = await userLogout()
    //true or false will be returned
    if(loggedOut){
      setUser(null)
    }
  };

  return (
    <nav>
      <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">BookNook</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home :) </Nav.Link>

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
                  <NavDropdown.Item
                    onClick={() => handleUserLogout()}
            
                  >
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
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}

export default NavBar;
