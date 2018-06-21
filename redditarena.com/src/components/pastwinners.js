import React from "react";
import "../index.css";
import { Col } from "react-bootstrap";

const PastWinners = props => {
  return (
    <Col md={6}>
      <h1 className="title">
        <b>Past Winners</b>
      </h1>
      <div style={{ height: "500px" }} />
    </Col>
  );
};

export default PastWinners;
