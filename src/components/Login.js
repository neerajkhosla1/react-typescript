import React, { useState, useContext } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { LoginContext } from "../context";
import { Link } from "react-router-dom";
import {doPostLogin} from "../http/userApi";

export default function Login(props) {
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const loginContext = useContext(LoginContext);
  const loginDetails = { email, password };
  const validateForm = (email, password) => {
    return email.length > 0 && password.length > 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    doPostLogin(loginDetails)
    .then(({ data }) => {
      if(data.token) {
        loginContext.logIn(loginDetails, data.token);
        props.history.push("/welcome");
      }
    })
    .catch(({ response }) => {
      if (response.data.code) {
        setMessage('Invalid Credentials.');
      }
    });
  };

  return (
    <div className="Login container">
    <p>{message !== '' ? message : null}</p>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel className="labelFormatting">Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            className="inputFormatting"
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel className="labelFormatting">Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="inputFormatting"
          />
        </FormGroup>
        <Button
          className={!validateForm(email, password) ? "loginBtnBlur" : "loginBtnShow"}
          block
          type="submit"
        >
          Login
        </Button>
      </form>
      <div className="patBtn">
        <Link className="lnk" to="/register">
          <Button className="helpBtn" block>
            Register
          </Button>
        </Link>
        <Link className="lnk" to="/forgotPassword">
          <Button className="helpBtn" block>
            Forgot Password
          </Button>
        </Link>
      </div>
    </div>
  );
}
