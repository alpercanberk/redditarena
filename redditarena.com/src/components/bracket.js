import React, { Component } from "react";
import "../index.css";
import bracket from "../images/8bracket.jpg";
import BracketThumbnail from "./bracket_thumbnail.js";
import axios from "axios";

const murl = "http://localhost:1226/get_match"; //match url
const burl = "http://localhost:1226/get_boss/"; //boss url
const quarterMargins = [["34","0"], ["164","0"],["294","0"],["424","0"],["34","890"],["164","890"],["294","890"],["424","890"]];
const semiMargins = [["100","180"],["360","180"],["100","710"],["360","710"]]
const finalMargins = [["230","295"],["230","600"]]

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
        Object.keys(data).map((key, index) => {               //the keys of response.data is mapped to access the inner objects
          let sub_object = data[key];                         //each of the sub-objects are declared as sub_object for convenience
          Object.keys(sub_object).map((sub_key, _index) => {  //sub_object's keys are mapped to access its values
            let boss_id = sub_object[sub_key];                     //each boss's unique id is saved as boss_id
            axios.get(burl + boss_id).then(res => {                //boss_id is used to get each boss's data
              if (key === "quarter") {
                this.state.quarter[sub_key] = res.data;       //the boss is uploaded to the corresponding match category
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
    let quarters = []
    for (var i = 0; i < 8; i++) {
      quarters.push(
        <BracketThumbnail
          marginTop={quarterMargins[i][0]}
          marginLeft={quarterMargins[i][1]}
          data={this.state.quarter[i]}
          className={"quarter"+i}
        />
      )
    }
    let semis = []
    for (var i = 0; i < 4; i++) {
      quarters.push(
        <BracketThumbnail
          marginTop={semiMargins[i][0]}
          marginLeft={semiMargins[i][1]}
          data={this.state.semi[i]}
          className={"semi"+i}
        />
      )
    }
    let finals = []
    for (var i = 0; i < 2; i++) {
      quarters.push(
        <BracketThumbnail
          marginTop={finalMargins[i][0]}
          marginLeft={finalMargins[i][1]}
          data={this.state.final[i]}
          className={"final"+i}
        />
      )
    }
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
            {quarters}
            {semis}
            {finals}
            <BracketThumbnail
              marginTop="230"
              marginLeft="450"
              data={this.state.winner[0]}
            />

          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Bracket;
