import React, { Component } from "react";
import "../index.css";
import bracket from "../images/8bracket.jpg";
import BracketThumbnail from "./bracket_thumbnail.js";

class Bracket extends Component {
  constructor(props) {
    super(props);
    console.log(props.data);
  }

  render() {
    return (
      <div>
        <div
          id="main"
          style={{
            width: "1000px",
            height: "500px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(" + bracket + ")",
            margin: "auto",
            backgroundSize: "100% 500px"
          }}
        >
          <BracketThumbnail marginTop="34" marginLeft="0" name="Box One" />
          <BracketThumbnail marginTop="164" marginLeft="0" name="Box Two" />
          <BracketThumbnail marginTop="294" marginLeft="0" name="Box Three" />
          <BracketThumbnail marginTop="424" marginLeft="0" name="Box Four" />

          <BracketThumbnail marginTop="34" marginLeft="890" name="Box Five" />
          <BracketThumbnail marginTop="164" marginLeft="890" name="Box Six" />
          <BracketThumbnail marginTop="294" marginLeft="890" name="Box Seven" />
          <BracketThumbnail marginTop="424" marginLeft="890" name="Box Eight" />

          <BracketThumbnail marginTop="100" marginLeft="180" name="Box Nine" />
          <BracketThumbnail marginTop="360" marginLeft="180" name="Box Ten" />

          <BracketThumbnail
            marginTop="100"
            marginLeft="710"
            name="Box Eleven"
          />
          <BracketThumbnail
            marginTop="360"
            marginLeft="710"
            name="Box Twelve"
          />

          <BracketThumbnail
            marginTop="230"
            marginLeft="600"
            name="Box Thirteen"
          />
          <BracketThumbnail
            marginTop="230"
            marginLeft="450"
            name="Box Fourteen"
          />
          <BracketThumbnail
            marginTop="230"
            marginLeft="290"
            name="Box Fifteen"
          />
        </div>
      </div>
    );
  }
}

export default Bracket;
