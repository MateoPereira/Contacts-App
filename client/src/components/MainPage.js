import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <Container className="text-center mt-5">
        <h1 className="mt-5 primary-text">Contacts App!</h1>
        <h1 className="mt-5 secondary-text">You can save your contacts in this site</h1>
        <Link to="/signin" className="text-white">
          <Button className="sign-in-button secondary-text bg-dark border-0 mt-5">
            Sign in!
        </Button>
          </Link>
      </Container>
    </div>
  );
}
