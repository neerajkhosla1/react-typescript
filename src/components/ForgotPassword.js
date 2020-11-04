import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import {doPostForgotPassword} from "../http/userApi";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState('');

  const validateForm = (email) => {
    return email.length > 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    doPostForgotPassword({"email": email})
    .then(({ data }) => {
      if(data.success) {
        setEmailSent(true);
        setMessage('');
      }
    })
    .catch(({ response }) => {
      if (response.data.error) {
        setMessage(response.data.message);
      } else if(!response.data.error) {
        setMessage(response.data);
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
            className="inputFormatting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
          <Button
            block
            type="submit"
            className={!validateForm(email) || emailSent ? "loginBtnBlur" : "loginBtnShow"}
          >
            Send Link
          </Button>
        <div className="checkEmail">
          {emailSent ? "Please check your email." : null}
        </div>
      </form>

      <div className="patBtn">
        <Link className="lnk" to="/">
          <Button className="helpBtn" block>
            Go on Login Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
