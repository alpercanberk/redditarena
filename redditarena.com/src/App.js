import React, { Component } from "react";
import "./assets/react-toolbox/theme.css";
import theme from "./assets/react-toolbox/theme.js";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import "./index.css";

import Title from "./components/title";
import Bracket from "./components/bracket";
import PastWinners from "./components/pastwinners";
import WeeklyMatchup from "./components/weeklymatchup";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Title />
            <Bracket />
            <PastWinners />
            <WeeklyMatchup />
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
