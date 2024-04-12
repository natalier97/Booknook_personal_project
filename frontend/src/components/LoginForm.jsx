import { useState } from "react";
import { userLogin, userSignUp } from "../utilities";
import { useOutletContext } from "react-router-dom";

//bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");

  // let myoutletObj = useOutletContext();
  let { setUser } = useOutletContext();

  ////////////////////////////////////
  //// HANDLING CHECKBOX TOGGLE////
  /////////////////////////////////
  function toggleLogin() {
    setIsLogin(!isLogin);
    setIsSignUp(false);
  }
  function toggleSignUp() {
    setIsSignUp(!isSignUp);
    setIsLogin(false);
  }
  ////////////////////////////////////
  ////SIGN UP FUNCTION ////
  /////////////////////////////////
  async function handleSignUp(event){
    event.preventDefault();
    
    let user = await userSignUp(emailInput, passwordInput, firstNameInput)
    setUser(user)
    //  setUser({ email: emailInput, user })
    console.log(user)
  }


  ////////////////////////////////////
  ////LOGIN FUNCTION ////
  /////////////////////////////////
  async function handleLogin(event) {
    event.preventDefault();
    let user = await userLogin(emailInput, passwordInput);
    setUser(user);
    console.log(user);
  }

  return (
    <Card border="dark" id="loginform-card">
      <Form onSubmit={isLogin ? handleLogin : handleSignUp}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(event) => setEmailInput(event.target.value)}
            type="email"
            placeholder="Enter email"
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(event) => setPasswordInput(event.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        {/* conditional rendering for ifSignUp === true */}
        {isSignUp ? (
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={(e) => setFirstNameInput(e.target.value)}
              type="text"
              placeholder='"Natalie"'
            />
          </Form.Group>
        ) : null}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            checked={isSignUp}
            onChange={toggleSignUp}
            label="Sign Up"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            checked={isLogin}
            onChange={toggleLogin}
            label="Log In"
          />
        </Form.Group>

        <Button variant="outline-dark" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default LoginForm;
