import React, { useState, useContext } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { LoginContext } from "../context";
import { Link } from "react-router-dom";
import {doPostResetPassword} from "../http/userApi";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState('');
  const loginContext = useContext(LoginContext);
  const details = {
    "email" : loginContext.user ? loginContext.user.email : localStorage.getItem('email'),
    "token": props.location.search.substring(3),
    "password": password,
  }
  const validateForm = (password, confirmPassword) => {
    return password === confirmPassword && password.length > 0 && confirmPassword.length > 0;
  };
  const handleSubmit = () => {
    doPostResetPassword(details)
    .then(({ data }) => {
    loginContext.logOut('viaReset');
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
      <form>
        <FormGroup controlId="password">
          <FormLabel className="labelFormatting">Type New Password</FormLabel>
          <FormControl
            autoFocus
            type="password"
            className="inputFormatting"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel className="labelFormatting">Confirm Password</FormLabel>
          <FormControl
            autoFocus
            type="password"
            className="inputFormatting"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <Link to="/">
          <Button
            block
            className={!validateForm(password, confirmPassword) ? "loginBtnBlur" : "loginBtnShow" }
            onClick={handleSubmit}
          >
            Generate
          </Button>
        </Link>
      </form>
      <div className="patBtn">
        <Link to="/">
          <Button className="helpBtn" block>
            Go on Login Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
