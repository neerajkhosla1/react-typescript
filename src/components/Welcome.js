import React, { useContext } from "react";
import { LoginContext } from "../context";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Welcome = () => {
  const loginContext = useContext(LoginContext);

  const handleSubmit = () => {
    loginContext.logOut('');
  };
  return (
    <div className="container">
      <p className="welcomeForm">
        <span>
          Welcome{" "}
          {localStorage.getItem("name") !== "undefined"
            ? localStorage.getItem("name")
            : localStorage.getItem("email")}
        </span>
      </p>
      <div className="patBtn">
        <Link className="lnk" to="/">
          <Button className="helpBtn" block onClick={handleSubmit}>
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
