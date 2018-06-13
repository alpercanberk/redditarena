import React, { Component } from "react";
import "../index.css";
import bracket from "../images/8bracket.jpg";

class Bracket extends Component {
  constructor(props) {
    super(props);
    console.log(props.data);
  }

  bracketThumbnail(topmargin, leftmargin = 0, image = 0) {
    console.log(topmargin.toString() + "px");
    return (
      <div
        style={{
          position: "absolute",
          height: "75px",
          width: "100px",
          backgroundColor: "white",
          border: "solid black",
          borderRadius: "5px",
          marginTop: topmargin.toString() + "px",
          marginLeft: leftmargin.toString() + "px"
        }}
      />
    );
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
          {(() => this.bracketThumbnail(30))()}
          {(() => this.bracketThumbnail(160))()}
          {(() => this.bracketThumbnail(290))()}
          {(() => this.bracketThumbnail(420))()}

          {(() => this.bracketThumbnail(30, 895))()}
          {(() => this.bracketThumbnail(160, 895))()}
          {(() => this.bracketThumbnail(290, 895))()}
          {(() => this.bracketThumbnail(420, 895))()}

          {(() => this.bracketThumbnail(95, 200))()}
          {(() => this.bracketThumbnail(225, 300))()}
          {(() => this.bracketThumbnail(355, 200))()}

          {(() => this.bracketThumbnail(95, 700))()}
          {(() => this.bracketThumbnail(225, 600))()}
          {(() => this.bracketThumbnail(355, 700))()}

          {(() => this.bracketThumbnail(225, 445))()}
        </div>
      </div>
    );
  }
}

export default Bracket;
