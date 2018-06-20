import React, { Component } from "react";

import "./index.css";

import Title from "./components/title";
import Bracket from "./components/bracket";
import PastWinners from "./components/pastwinners";
import WeeklyMatchup from "./components/weeklymatchup";

import testingdata from "./testingdata.json";


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Title />
          <Bracket data={testingdata} />
          <PastWinners />
          <WeeklyMatchup />
        </header>
      </div>
    );
  }
}

export default App;
