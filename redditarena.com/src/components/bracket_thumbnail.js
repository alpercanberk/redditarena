import Dialog from "react-toolbox/lib/dialog/Dialog";
import React from "react";
import Button from "react-toolbox/lib/button/Button";

class BracketThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  handleToggle = () => {
    this.setState({ active: !this.state.active });
  };

  actions = [
    { label: "Cancel", onClick: this.handleToggle },
    { label: "Save", onClick: this.handleToggle }
  ];

  render() {
    return (
      <div
        style={{
          position: "absolute",
          height: "75px",
          width: "100px",
          backgroundColor: "white",
          border: "solid black",
          borderRadius: "5px",
          marginLeft: this.props.marginLeft.toString() + "px",
          marginTop: this.props.marginTop.toString() + "px"
        }}
        onClick={this.handleToggle}
      >
        <div onClick={this.handleToggle}>
          <div>{this.props.name}</div>
        </div>
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title="My awesome dialog"
        >
          <p>{this.props.name}</p>
        </Dialog>
      </div>
    );
  }
}
export default BracketThumbnail;
