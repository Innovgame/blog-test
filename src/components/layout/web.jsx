import React, { Component } from "react";

import PropTypes from "prop-types";

class WebLayout extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="Web">
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default WebLayout;
