import React, { useState, useContext } from "react";
import { LoginContext } from "../context";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import {doPostRegister} from '../http/userApi';

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const loginContext = useContext(LoginContext);
  const loginDetails = { name, email, password };
  const validateForm = (name, email, password) => {
    return name.length > 0 && email.length > 0 && password.length > 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    doPostRegister(loginDetails)
    .then(({ data }) => {
      if(data.success) {
        loginContext.logIn(loginDetails);
        props.history.push("/welcome");
      }
    })
    .catch(({ response }) => {
      if (response.data.error && response.data.message) {
        setMessage(response.data.message);
      }
    });
  };

  return (
    <div className="Login container">
      <p>{message !== '' ? message : null}</p>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name">
          <FormLabel className="labelFormatting">Name</FormLabel>
          <FormControl
            autoFocus
            type="name"
            className="inputFormatting"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel className="labelFormatting">Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            className="inputFormatting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel className="labelFormatting">Password</FormLabel>
          <FormControl
            value={password}
            className="inputFormatting"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button
          block
          className={!validateForm(name, email, password) ? "loginBtnBlur" : "loginBtnShow" }
          type="submit"
        >
          Register
        </Button>
      </form>
      <div className="patBtn">
        <Link className="lnk" to="/">
          <Button className="helpBtn" block>
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
