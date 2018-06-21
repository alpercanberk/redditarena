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

  actions = [{ label: "Back", onClick: this.handleToggle }];

  render() {
    return (
      <div
        style={{
          position: "absolute",
          height: "75px",
          width: "100px",
          backgroundColor: "white",
          marginLeft: this.props.marginLeft.toString() + "px",
          marginTop: this.props.marginTop.toString() + "px"
        }}
        onClick={this.handleToggle}
      >
        <div onClick={this.handleToggle}>
          <img
            src={this.props.data.thumbnail_image}
            width="100px"
            height="75px"
            className="bossthumbnail"
          />
        </div>
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
        >
          <div style={{ color: "black" }}>
            <h1
              style={{
                textAlign: "center",
                marginBottom: "20px",
                width: "100%",
                zIndex: "1"
              }}
            >
              {this.props.data.name}
            </h1>
            <div style={{ display: "inline", float: "right" }}>
              <img
                src="https://i.imgur.com/o8yoe8k.png"
                height="70"
                width="70"
                style={{
                  display: "inline",
                  position: "absolute",
                  top: "20px",
                  right: "100px"
                }}
              />
              <div
                style={{
                  display: "inline",
                  position: "absolute",
                  fontSize: "40px",
                  right: "50px",
                  top: "30px",
                  color: "rgb(235,80,4)"
                }}
              >
                {this.props.data.ups}
              </div>
            </div>
          </div>
          <img src={this.props.data.image} className="bossdialogimage" />
          <p />
        </Dialog>
      </div>
    );
  }
}
export default BracketThumbnail;
