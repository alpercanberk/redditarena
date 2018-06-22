import React, { Component } from "react";
import "../index.css";
import bracket from "../images/8bracket.jpg";
import BracketThumbnail from "./bracket_thumbnail.js";
import axios from "axios";

const murl = "http://localhost:1226/get_match"; //match url
const burl = "http://localhost:1226/get_boss/"; //boss url

const dummydata = {
  title: "Box",
  ups: "32",
  thumbnail:
    "https://b.thumbs.redditmedia.com/jJ1jvZ22CY7CoYdL8y5xRA6TmeBodjBuqF9cDZYoAbo.jpg",
  image:
    "https://i.redditmedia.com/9Co2pdqU0f6OsbNQrioMWBlQkDWxhJ0tQKZhBT02tSA.jpg?w=769&s=4a1d194b0f4215f32a792977cdf4efbe"
};

class Bracket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: [],
      quarter: [],
      semi: [],
      final: []
    };
  }

  componentDidMount() {
    //big request

    axios
      .get(murl) //this gets the most recent match and handles response
        .then(({ data }) => {                                 //response.data is an object which has also has object values
        console.log(data);
        Object.keys(data).map((key, index) => {               //the keys of response.data is mapped

          console.log(key, data[key], index);
          let sub_object = data[key];                         //the values corresponding to the keys are also objects, these objects will
          Object.keys(sub_object).map((sub_key, _index) => {  
            let id = sub_object[sub_key];
            axios.get(burl + id).then(res => {
              if (key === "quarter") {
                this.state.quarter[sub_key] = res.data;
                this.forceUpdate();
              } else if (key === "semi") {
                this.state.semi[sub_key] = res.data;
                this.forceUpdate();
              } else if (key === "final") {
                this.state.final[sub_key] = res.data;
                this.forceUpdate();
              } else {
                this.state.winner[sub_key] = res.data;
                this.forceUpdate();
              }


            });
          });
        });
      });
  }

  render() {
    if (this.state.winner[0] != null) {
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
            <BracketThumbnail
              marginTop="34"
              marginLeft="0"
              data={this.state.quarter[0]}
            />
            <BracketThumbnail
              marginTop="164"
              marginLeft="0"
              data={this.state.quarter[1]}
            />
            <BracketThumbnail
              marginTop="294"
              marginLeft="0"
              data={this.state.quarter[2]}
            />
            <BracketThumbnail
              marginTop="424"
              marginLeft="0"
              data={this.state.quarter[3]}
            />
            <BracketThumbnail
              marginTop="34"
              marginLeft="890"
              data={this.state.quarter[4]}
            />
            <BracketThumbnail
              marginTop="164"
              marginLeft="890"
              data={this.state.quarter[5]}
            />
            <BracketThumbnail
              marginTop="294"
              marginLeft="890"
              data={this.state.quarter[6]}
            />
            <BracketThumbnail
              marginTop="424"
              marginLeft="890"
              data={this.state.quarter[7]}
            />
            <BracketThumbnail
              marginTop="100"
              marginLeft="180"
              data={this.state.semi[0]}
            />
            <BracketThumbnail
              marginTop="360"
              marginLeft="180"
              data={this.state.semi[1]}
            />
            <BracketThumbnail
              marginTop="100"
              marginLeft="710"
              data={this.state.semi[2]}
            />
            <BracketThumbnail
              marginTop="360"
              marginLeft="710"
              data={this.state.semi[3]}
            />
            <BracketThumbnail
              marginTop="230"
              marginLeft="600"
              data={this.state.final[1]}
            />
            <BracketThumbnail
              marginTop="230"
              marginLeft="450"
              data={this.state.winner[0]}
            />
            <BracketThumbnail
              marginTop="230"
              marginLeft="290"
              data={this.state.final[0]}
            />
            }
          </div>
        </div>
      );
    } else {
      return <div>loading</div>;
    }
  }
}

export default Bracket;
