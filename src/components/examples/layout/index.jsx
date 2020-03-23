import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
