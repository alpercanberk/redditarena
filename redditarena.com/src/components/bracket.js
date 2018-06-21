import React, { Component } from "react";
import "../index.css";
import bracket from "../images/8bracket.jpg";
import BracketThumbnail from "./bracket_thumbnail.js";

const dummydata = {
  name: "Box",
  ups: "32",
  thumbnail_image:
    "https://b.thumbs.redditmedia.com/jJ1jvZ22CY7CoYdL8y5xRA6TmeBodjBuqF9cDZYoAbo.jpg",
  image:
    "https://i.redditmedia.com/9Co2pdqU0f6OsbNQrioMWBlQkDWxhJ0tQKZhBT02tSA.jpg?w=769&s=4a1d194b0f4215f32a792977cdf4efbe"
};

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
          <BracketThumbnail marginTop="34" marginLeft="0" data={dummydata} />
          <BracketThumbnail marginTop="164" marginLeft="0" data={dummydata} />
          <BracketThumbnail marginTop="294" marginLeft="0" data={dummydata} />
          <BracketThumbnail marginTop="424" marginLeft="0" data={dummydata} />

          <BracketThumbnail marginTop="34" marginLeft="890" data={dummydata} />
          <BracketThumbnail marginTop="164" marginLeft="890" data={dummydata} />
          <BracketThumbnail marginTop="294" marginLeft="890" data={dummydata} />
          <BracketThumbnail marginTop="424" marginLeft="890" data={dummydata} />

          <BracketThumbnail marginTop="100" marginLeft="180" data={dummydata} />
          <BracketThumbnail marginTop="360" marginLeft="180" data={dummydata} />

          <BracketThumbnail marginTop="100" marginLeft="710" data={dummydata} />
          <BracketThumbnail marginTop="360" marginLeft="710" data={dummydata} />

          <BracketThumbnail marginTop="230" marginLeft="600" data={dummydata} />
          <BracketThumbnail marginTop="230" marginLeft="450" data={dummydata} />
          <BracketThumbnail marginTop="230" marginLeft="290" data={dummydata} />
        </div>
      </div>
    );
  }
}

export default Bracket;
